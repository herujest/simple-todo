import React, {useMemo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import json from '../../Assets/Fonts/selection.json';

interface IconSet {
  icons: Array<any>;
}
interface IconAttrs {
  fill?: string;
}
interface IconMap {
  name: string;
  paths: Array<string>;
  attrs?: Array<IconAttrs>;
}

export type IconName =
  | 'params'
  | 'sunrise'
  | 'afternoon'
  | 'sunset'
  | 'night'
  | 'settings-filled'
  | 'home'
  | 'home-filled'
  | 'arrow-up-left2'
  | 'arrow-up2'
  | 'arrow-up-right2'
  | 'arrow-right2'
  | 'arrow-down-right2'
  | 'arrow-down2'
  | 'arrow-down-left2'
  | 'arrow-left2'
  | 'radio-unchecked'
  | 'plus-circle'
  | 'clock'
  | 'settings'
  | 'close'
  | 'work-case'
  | 'todo-done'
  | 'experiment'
  | 'education-learning'
  | 'travel-luggage'
  | 'clean'
  | 'exercise-health-fitness'
  | 'edit'
  | 'trash-bin';

export interface IIcon extends Omit<SvgIconProps, 'iconSet' | 'name' | 'size'> {
  name: IconName;
  color?: string;
  size?: number;
  strokeWidth?: number;
  offset?: number;
  style?: StyleProp<ViewStyle>;
}

export interface SvgIconProps {
  iconSet: IconSet;
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  offset?: number; // some icon might have different padding, use this to offset it
  width?: number;
  height?: number;
  viewBoxWidthPercentage?: number;
  viewBoxHeightPercentage?: number;
  style?: StyleProp<ViewStyle>;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  iconSet,
  size = 32,
  color,
  name,
  offset = 0,
  strokeWidth = 1,
  width,
  height,
  viewBoxWidthPercentage,
  viewBoxHeightPercentage,
  style,
}) => {
  if (!iconSet || !name) {
    console.error('The "iconSet" and "name" props are required.');
    return null;
  }

  const viewBoxMax = 1024;
  const localOffset = (offset / 2) * -viewBoxMax;
  const offsetedViewBox = viewBoxMax - localOffset;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentIcon: IconMap | undefined = useMemo(() => {
    return iconSet.icons
      .map((i: any) => {
        return {
          name: i.properties.name,
          paths: i.icon.paths,
          attrs: i.attrs,
        } as IconMap;
      })
      .find((i: IconMap) => {
        return i.name === name;
      });
  }, [iconSet, name]);

  if (currentIcon === undefined) {
    return null;
  }

  const paths = currentIcon.paths.map((p, i) => {
    return (
      <Path
        key={String(i)}
        d={p}
        strokeWidth={5 * strokeWidth}
        stroke={color || currentIcon.attrs?.[i]?.fill}
        fill={color || currentIcon.attrs?.[i]?.fill}
      />
    );
  });

  const svgWidth = width || height || size;
  const svgHeight = height || width || size;
  const viewBoxWidth = viewBoxWidthPercentage
    ? offsetedViewBox * viewBoxWidthPercentage
    : offsetedViewBox;
  const viewBoxHeight = viewBoxHeightPercentage
    ? offsetedViewBox * viewBoxHeightPercentage
    : offsetedViewBox;

  return (
    <Svg
      width={String(svgWidth)}
      height={String(svgHeight)}
      style={style}
      viewBox={`${localOffset} ${localOffset} ${viewBoxWidth} ${viewBoxHeight}`}>
      {paths}
    </Svg>
  );
};

export function iconList(iconSet: IconSet) {
  if (iconSet && Array.isArray(iconSet.icons)) {
    return iconSet.icons.map(icon => icon.properties.name);
  }
  return null;
}

export default function Icon({
  name,
  color,
  size,
  strokeWidth,
  offset,
  height,
  width,
  viewBoxWidthPercentage,
  viewBoxHeightPercentage,
  style,
}: IIcon) {
  const sizeIcon = size || 15;

  return (
    <SvgIcon
      iconSet={json}
      name={name}
      color={color}
      size={sizeIcon}
      strokeWidth={strokeWidth}
      offset={offset}
      width={width}
      height={height}
      viewBoxWidthPercentage={viewBoxWidthPercentage}
      viewBoxHeightPercentage={viewBoxHeightPercentage}
      style={style}
    />
  );
}
