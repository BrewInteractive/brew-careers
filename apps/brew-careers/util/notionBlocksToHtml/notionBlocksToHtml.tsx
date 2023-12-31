import type { Block, RichText } from "./notionBlocksToHtml.types";

import React from "react";
import notionAnnotationToCssProperties from "../notionAnnotationToCssProperties/notionAnnotationToCssProperties";

const types: { [key: string]: string } = {
  heading_1: "h2",
  heading_2: "h3",
  heading_3: "h4",
  paragraph: "div",
  bulleted_list_item: "li",
};

function createHtmlElement(block: Block): React.ReactNode {
  let elementType = types[block.type];
  if (!elementType) {
    elementType = "div";
  }

  let content: React.ReactNode[] = [];

  if (block[block.type] && block[block.type].rich_text.length < 1) {
    content.push(<div style={{ height: "40px" }}></div>);
  }

  if (block[block.type] && block[block.type].rich_text) {
    const richText: RichText[] = block[block.type].rich_text;

    richText.forEach((text, index) => {
      content.push(
        <div
          key={index}
          style={{
            ...notionAnnotationToCssProperties(text.annotations),
            ...{
              display: "inline",
            },
          }}
        >
          {text.text.content}
        </div>
      );
    });
  }

  return React.createElement(
    elementType,
    { style: { paddingBlock: "3px" } },
    content
  );
}

function notionBlocksToHtml(blocks: Block[]): React.ReactNode {
  return blocks.map((block, index) => (
    <div key={index}>{createHtmlElement(block)}</div>
  ));
}

export default notionBlocksToHtml;
