const headingsTreeview = (dom) => {
  const stack = [{ tag: "H0", id: "id0", children: [] }];
  const headers = "h1, h2, h3, h4, h5, h6";

  for (const header of dom.querySelectorAll(headers)) {
    const { tagName: tag, textContent: text, id } = header;
    const node = { tag, text, id };

    let last = stack.at(-1);

    while (last.tag >= node.tag) {
      stack.pop();
      last = stack.at(-1);
    }

    last.children = last.children || [];
    last.children.push(node);
    stack.push(node);
  }

  return stack[0].children;
};

const dom = new DOMParser().parseFromString(
  `<!DOCTYPE html>
  <body>
    <h1 id="A1">A1</h1>
    <h2 id="B1">B1</h2>
    <h2 id="B2">B2</h2>
    <h3 id="C1">C1</h3>
    <h4 id="D1">D1</h4>
    <h6 id="F1">F1</h4>
    <h4 id="D2">D2</h4>
    <h2 id="B5">B5</h2>
    <h3 id="C3">C3</h3>
    <h1 id="A2">A2</h1>
    <h2 id="B6">B6</h2>
  </body>`,
  "text/html"
);

console.log(headingsTreeview(dom));

/**
 * Results
 */

// [
//   {
//     "tag": "H1",
//     "text": "A1",
//     "id": "A1",
//     "children": [
//       {
//         "tag": "H2",
//         "text": "B1",
//         "id": "B1"
//       },
//       {
//         "tag": "H2",
//         "text": "B2",
//         "id": "B2",
//         "children": [
//           {
//             "tag": "H3",
//             "text": "C1",
//             "id": "C1",
//             "children": [
//               {
//                 "tag": "H4",
//                 "text": "D1",
//                 "id": "D1",
//                 "children": [
//                   {
//                     "tag": "H6",
//                     "text": "F1",
//                     "id": "F1"
//                   }
//                 ]
//               },
//               {
//                 "tag": "H4",
//                 "text": "D2",
//                 "id": "D2"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "tag": "H2",
//         "text": "B5",
//         "id": "B5",
//         "children": [
//           {
//             "tag": "H3",
//             "text": "C3",
//             "id": "C3"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "tag": "H1",
//     "text": "A2",
//     "id": "A2",
//     "children": [
//       {
//         "tag": "H2",
//         "text": "B6",
//         "id": "B6"
//       }
//     ]
//   }
// ]
