import { ANNOTATION_COLOR } from "react-openlayers7/dist/Map/constants";
import { Coordinate } from "ol/coordinate";
import { textColor } from "../utils";
import { Annotation } from "../query/model";
import {
  CustomMarker,
  CustomPolyLine,
  CustomPolygon,
  CustomRectangle,
  InnerText,
  TextMarker,
  icon,
} from "react-openlayers7";

icon.marker = "/icons/marker-basic.png";
icon.selected = "/icons/marker-selected.png";

export interface AnnotationGeometryProps {
  annotation: Annotation;
  isShownText?: boolean;
  zIndex?: number;
}

export default function AnnotationGeometry({
  annotation,
  isShownText = true,
  zIndex = 0,
}: AnnotationGeometryProps) {
  const properties = JSON.parse(annotation.title);
  const fontSize = properties.fontSize;
  const opacity = properties.opacity;
  const color = properties.color
    ? ((
        properties.color as string
      ).toUpperCase() as keyof typeof ANNOTATION_COLOR)
    : ("BLUE" as keyof typeof ANNOTATION_COLOR);
  if (annotation.type === "marker") {
    return (
      <CustomMarker
        opacity={opacity}
        zIndex={zIndex}
        center={annotation.position[0] as Coordinate}
        properties={{ ...annotation, ...properties }}
      >
        {isShownText ? (
          <InnerText size={fontSize} color={textColor(properties.issueGrade)}>
            {properties.title}
          </InnerText>
        ) : null}
      </CustomMarker>
    );
  }
  if (annotation.type === "line") {
    return (
      <CustomPolyLine
        zIndex={zIndex}
        opacity={opacity}
        color={color}
        properties={{ ...annotation, ...properties }}
        positions={
          (annotation.position as Coordinate[]).map((latlng) =>
            [...latlng].reverse()
          ) as Coordinate[]
        }
      >
        {isShownText ? (
          <InnerText size={fontSize} color={textColor(properties.issueGrade)}>
            {properties.title}
          </InnerText>
        ) : null}
      </CustomPolyLine>
    );
  }

  if (annotation.type === "polygon") {
    return (
      <CustomPolygon
        opacity={opacity}
        zIndex={zIndex}
        color={color}
        properties={{ ...annotation, ...properties }}
        positions={[
          (annotation.position as Coordinate[]).map((latlng) =>
            [...latlng].reverse()
          ) as Coordinate[],
        ]}
      >
        {isShownText ? (
          <InnerText size={fontSize} color={textColor(properties.issueGrade)}>
            {properties.title}
          </InnerText>
        ) : null}
      </CustomPolygon>
    );
  }

  if (annotation.type === "rectangle") {
    return (
      <CustomRectangle
        opacity={opacity}
        zIndex={zIndex}
        color={color}
        properties={{ ...annotation, ...properties }}
        positions={[
          (annotation.position as Coordinate[]).map((latlng) =>
            [...latlng].reverse()
          ) as Coordinate[],
        ]}
      >
        {isShownText ? (
          <InnerText size={fontSize} color={textColor(properties.issueGrade)}>
            {properties.title}
          </InnerText>
        ) : null}
      </CustomRectangle>
    );
  }

  if (annotation.type === "text") {
    return (
      <TextMarker
        opacity={opacity}
        zIndex={zIndex}
        center={annotation.position[0] as Coordinate}
        properties={{ ...annotation, ...properties }}
      >
        {isShownText ? (
          <InnerText
            outline
            size={fontSize}
            color={textColor(properties.issueGrade)}
          >
            {properties.title}
          </InnerText>
        ) : null}
      </TextMarker>
    );
  }
}
