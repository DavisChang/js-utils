const traverseTreeview = (nodes) => {
  let ids = [];

  const traverse = (node) => {
    ids.push(node.id);
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child));
    }
  };

  nodes.forEach((node) => traverse(node));
  return ids;
};

const data = [
  {
    tag: "H1",
    text: "A1",
    id: "A1",
    children: [
      {
        tag: "H2",
        text: "B1",
        id: "B1",
      },
      {
        tag: "H2",
        text: "B2",
        id: "B2",
        children: [
          {
            tag: "H3",
            text: "C1",
            id: "C1",
            children: [
              {
                tag: "H4",
                text: "D1",
                id: "D1",
                children: [
                  {
                    tag: "H6",
                    text: "F1",
                    id: "F1",
                  },
                ],
              },
              {
                tag: "H4",
                text: "D2",
                id: "D2",
              },
            ],
          },
        ],
      },
      {
        tag: "H2",
        text: "B5",
        id: "B5",
        children: [
          {
            tag: "H3",
            text: "C3",
            id: "C3",
          },
        ],
      },
    ],
  },
  {
    tag: "H1",
    text: "A2",
    id: "A2",
    children: [
      {
        tag: "H2",
        text: "B6",
        id: "B6",
      },
    ],
  },
];

console.log("ids:", traverseTreeview(data));
