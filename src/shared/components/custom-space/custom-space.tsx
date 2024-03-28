import { Space, SpaceProps } from 'antd';

export const CustomSpace = ({ style, ...restProps }: SpaceProps) => (
  <Space style={{ display: 'flex', width: '100%', ...style }} {...restProps} />
);
