import * as path from "path";
import * as glob from "glob"
import esbuild from "esbuild"
import * as fs from "fs"
import * as fsPromises from "fs/promises"
import chalk from "chalk"

const pkg = JSON.parse(fs.readFileSync("./package.json").toString())
const deps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
]

const watchMode = process.argv.includes("--watch")

function AppendCssStyles () {
  return {
    name: "append-css-styles",
    setup(build) {
      build.onStart(async () => {
        const styles = await fsPromises.readFile(
          path.join(process.cwd(), "src", "css", "richer-text-core.css"),
          { encoding: "utf8" }
        )

        const finalString = `/* THIS FILE IS AUTO-GENERATED. DO NOT EDIT BY HAND! */
${styles.toString()}
`

        await fsPromises.mkdir(path.join(process.cwd(), "dist", "css"), { recursive: true })
        await fsPromises.writeFile(path.join(process.cwd(), "dist", "css", "richer-text.css"), finalString)
      })
    }
  }
}

function BuildTimer () {
  return {
    name: "build-timer",
    setup(build) {
      let startTime

      build.onStart(() => {
        startTime = Number(new Date())
      })

      build.onEnd(() => {
        const endTime = Number(new Date())
        const buildTime = endTime - startTime

        console.log(chalk.green(`Build complete in ${buildTime}ms!`), `✨\n\n`)
      })
    }
  }
}

;(async function () {
  const entries = {}
  glob.sync("./src/**/*.{js,css}")
    .forEach((file) => {
      const key = path.relative(path.join("src"), path.join(path.dirname(file), path.basename(file, path.extname(file))))
      const value = "." + path.sep + path.join(path.dirname(file), path.basename(file, path.extname(file)))
      entries[key] = value
    });

  const defaultConfig = {
    entryPoints: ["./src/index.js"],
    sourcemap: true,
    target: "es2020",
    color: true,
    bundle: true,
    external: [],
    plugins: [
      AppendCssStyles(),
    ]
  }

  const configs = [
    {
      ...defaultConfig,
      outfile: "dist/bundle/index.common.js",
      format: "cjs",
      minify: true,
    },
    {
      ...defaultConfig,
      outfile: "dist/bundle/index.module.js",
      format: "esm",
      minify: true,
      splitting: false,
    },
    {
      ...defaultConfig,
      entryPoints: entries,
      outdir: 'dist',
      format: 'esm',
      target: "es2020",
      external: deps,
      splitting: true,
      minify: false,
      chunkNames: 'chunks/[name]-[hash]',
      plugins: defaultConfig.plugins.concat([BuildTimer()])
    },
    // {
    //   ...defaultConfig,
    //   entryPoints: entries,
    //   outdir: 'cdn/dist',
    //   format: 'esm',
    //   target: "es2020",
    //   external: [],
    //   splitting: true,
    //   minify: false,
    //   chunkNames: 'chunks/[name]-[hash]'
    // },
  ]

  if (!watchMode) {
    await Promise.all(configs.map((config) => esbuild.build(config)))
      .catch((err) => {
        console.error(err)
        process.exit(1)
      })

    return
  }

  await Promise.all(configs.map(async (config) => {
    const context = await esbuild.context(config)
    return await context.watch()
  })).catch((err) => {
    console.error(err)
  })
})()
