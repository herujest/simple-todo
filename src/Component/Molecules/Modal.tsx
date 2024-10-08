import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import RNModal, {ModalProps} from 'react-native-modal';
import {useTheme} from '../../Context/ThemeContext';

export type IModalData = {
  isVisible: boolean;
  title?: string;
  body?: React.ReactNode;
};

interface IModal extends ModalProps {
  hideModal?: () => void;
  isVisible: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Modal = forwardRef(
  ({isVisible, hideModal, containerStyle, ...props}: IModal, ref) => {
    const {width} = useTheme();
    const [modalData, setModalData] = useState<IModalData | undefined>();

    function showModal(data: IModalData) {
      console.log('dataa', data);

      const updatedData = {
        ...data,
        isVisible: true,
      };
      setModalData(updatedData);
    }

    function closeModal() {
      setModalData({
        isVisible: false,
        title: '',
      });
    }

    useImperativeHandle(ref, () => ({
      _showModal: (data: IModalData) => showModal(data),
      _closeModal: () => closeModal(),
    }));

    return (
      <RNModal
        {...props}
        propagateSwipe
        // eslint-disable-next-line react-native/no-inline-styles
        style={{margin: 0}}
        swipeDirection={['down', 'left']}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        onSwipeComplete={hideModal}
        statusBarTranslucent={true}
        isVisible={modalData?.isVisible}>
        <View
          style={[
            {
              margin: width * 0.05,
              padding: width * 0.04,
            },
            containerStyle,
          ]}>
          {modalData?.body ? modalData?.body : props.children}
        </View>
      </RNModal>
    );
  },
);

export default Modal;
