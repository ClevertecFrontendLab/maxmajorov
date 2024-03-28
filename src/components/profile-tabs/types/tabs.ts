import { TabsProps } from 'antd';

export type TabArrayType = TabsProps['items'];
export type TabType<T> = UnpackedArray<TabsProps['items']> & { key: T };
export type UnpackedArray<T> = T extends Array<infer U> ? U : T;
