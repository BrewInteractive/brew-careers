import type { Annotation } from "./notionAnnotationToCssProperties.types";

function notionAnnotationToCssProperties(
  annotations: Annotation
): React.CSSProperties {
  const styleProperties: React.CSSProperties = {};
  if (annotations.bold) styleProperties["fontWeight"] = "bold";
  if (annotations.italic) styleProperties["fontStyle"] = "italic";
  if (annotations.strikethrough)
    styleProperties["textDecoration"] = "line-through";
  if (annotations.underline) styleProperties["textDecoration"] = "underline";
  if (annotations.code) styleProperties["fontFamily"] = "monospace";
  if (annotations.color) styleProperties["color"] = `${annotations.color}`;

  return styleProperties;
}

export default notionAnnotationToCssProperties;
