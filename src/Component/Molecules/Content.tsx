import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

interface IContent extends KeyboardAwareScrollViewProps {
  children: React.ReactNode;
  disableKBDismissScroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
  showsVerticalScrollIndicator?: boolean;
  scrollToChild?: (childRef: React.RefObject<any>) => void;
}

interface ContentRef {
  scrollToChild: (childRef: React.RefObject<any>) => void;
  scrollToPosition: ({x, y}: {x?: number; y?: number}) => any;
}

const Content = forwardRef<ContentRef | null, IContent>((props, ref) => {
  const scrollViewRef = useRef<ScrollView | null | undefined>();

  useImperativeHandle(
    ref,
    () => ({
      scrollToChild: childRef => {
        if (childRef && scrollViewRef.current) {
          (scrollViewRef.current as any)?.measureLayout(
            (scrollViewRef.current as any)?.getInnerViewNode(),
            (x: number, y: number) => {
              (scrollViewRef.current as any)?.scrollToPosition(0, y, true);
            },
            () => {},
          );
        }
      },
      scrollToPosition: ({x, y}: {x?: number; y?: number}) => {
        (scrollViewRef.current as any)?.scrollToPosition(0, y, true);
      },
    }),
    [scrollViewRef],
  );

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef as unknown as React.RefObject<KeyboardAwareScrollView>}
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={[{}, props.contentContainerStyle]}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}
      showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
      {...props}>
      {props.children}
    </KeyboardAwareScrollView>
  );
});

export default Content;
