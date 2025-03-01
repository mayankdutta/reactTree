export const FOLDER_STRUCTURE = {
  type: "folder",
  name: "root",
  children: [
    {
      type: "folder",
      name: "src",
      children: [
        {
          type: "folder",
          name: "components",
          children: [
            {
              type: "file",
              name: "App.jsx",
            },
            {
              type: "file",
              name: "Header.jsx",
            },
            {
              type: "folder",
              name: "common",
              children: [
                {
                  type: "file",
                  name: "Button.jsx",
                },
                {
                  type: "file",
                  name: "Input.jsx",
                },
              ],
            },
          ],
        },
        {
          type: "folder",
          name: "utils",
          children: [
            {
              type: "file",
              name: "helpers.js",
            },
            {
              type: "file",
              name: "constants.js",
            },
          ],
        },
        {
          type: "file",
          name: "index.js",
        },
        {
          type: "file",
          name: "App.css",
        },
      ],
    },
    {
      type: "folder",
      name: "public",
      children: [
        {
          type: "file",
          name: "index.html",
        },
        {
          type: "file",
          name: "favicon.ico",
        },
      ],
    },
    {
      type: "folder",
      name: "config",
      children: [
        {
          type: "file",
          name: "webpack.config.js",
        },
        {
          type: "file",
          name: "babel.config.js",
        },
      ],
    },
    {
      type: "folder",
      name: "tests",
      children: [
        {
          type: "file",
          name: "App.test.js",
        },
        {
          type: "file",
          name: "Header.test.js",
        },
      ],
    },
  ],
};
