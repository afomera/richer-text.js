"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("@tiptap/extension-text-style");
var _core = require("@tiptap/core");
var _default = _core.Extension.create({
  name: "fontSize",
  addOptions: function addOptions() {
    return {
      types: ['textStyle']
    };
  },
  addGlobalAttributes: function addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          "default": null,
          parseHTML: function parseHTML(element) {
            var _element$style$fontSi;
            return (_element$style$fontSi = element.style.fontSize) === null || _element$style$fontSi === void 0 ? void 0 : _element$style$fontSi.replace(/['"]+/g, '');
          },
          renderHTML: function renderHTML(attributes) {
            if (!attributes.fontSize) {
              return {};
            }
            return {
              style: "font-size: ".concat(attributes.fontSize)
            };
          }
        }
      }
    }];
  },
  addCommands: function addCommands() {
    return {
      setFontSize: function setFontSize(fontSize) {
        return function (_ref) {
          var chain = _ref.chain;
          return chain().setMark('textStyle', {
            fontSize: fontSize
          }).run();
        };
      },
      unsetFontSize: function unsetFontSize() {
        return function (_ref2) {
          var chain = _ref2.chain;
          return chain().setMark('textStyle', {
            fontSize: null
          }).removeEmptyTextStyle().run();
        };
      }
    };
  }
});
exports["default"] = _default;