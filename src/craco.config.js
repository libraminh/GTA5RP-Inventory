const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require("@craco/craco");

const path = require("path");
const CracoLessPlugin = require("craco-less");
const { getThemeVariables } = require("antd/dist/theme");

module.exports = {
  style: {
    postcss: {
      mode: "extends" /* (default value) */ || "file",
      plugins: [
        require("postcss-import"),
        require("tailwindcss")("./tailwind/tailwind.config.js"),
        require("autoprefixer"),
      ],
    },
  },
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: "css",
        },
      ],
    ],
  },
  webpack: {
    configure: {
      // output: {
      //   filename: "bundle.js",
      //   path: path.resolve(__dirname, "build"),
      // },

      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            loader: "file-loader",
            options: {
              name: "static/media/[name].[ext]",
            },
          },
        ],
      },
    },
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: ["*", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // If you are using less-loader@5 please spread the lessOptions to options directly
            modifyVars: getThemeVariables({
              dark: true,
              compact: false,
            }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
