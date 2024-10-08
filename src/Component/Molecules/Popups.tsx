import React, {
  forwardRef,
  memo,
  ReactElement,
  useImperativeHandle,
  useRef,
} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../Context/ThemeContext';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import Modal, {IModalData} from './Modal';

export type PopupType = {
  modalTitle?: string;
  onClose?: () => any;
  children?: React.ReactNode | ReactElement;
  hideCloseBtn?: boolean;
};
const Popups = forwardRef(({}: {}, ref) => {
  const {colors, width} = useTheme();

  const modalRef = useRef<any>();

  function setupModal(modalDataConfig: PopupType) {
    function _onClose() {
      modalDataConfig?.onClose?.();
      modalRef.current?._closeModal();
    }

    const modalData: IModalData = {
      isVisible: true,
      title: 'Popup',
      body: (
        <>
          {modalDataConfig?.hideCloseBtn ? null : (
            <View style={[{alignItems: 'flex-end'}]}>
              <TouchableOpacity
                onPress={_onClose}
                style={{margin: width * 0.03}}>
                <Icon name="close" />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={[
              {
                padding: width * 0.03,
                borderRadius: 20,
                backgroundColor: colors.background1,
              },
            ]}>
            {modalDataConfig.modalTitle ? (
              <Text
                variant="headline2"
                style={[
                  {
                    textAlign: 'center',
                    marginVertical: width * 0.03,
                  },
                ]}>
                {modalDataConfig.modalTitle}
              </Text>
            ) : null}
            {modalDataConfig?.children ? modalDataConfig?.children : null}
          </View>
        </>
      ),
    };

    modalRef?.current?._showModal(modalData);
  }

  useImperativeHandle(ref, () => ({
    _showModal: (option: PopupType) => {
      setupModal(option);
    },
    _closeModal: () => modalRef.current?._closeModal(),
  }));

  return (
    <Modal
      ref={modalRef}
      hideModal={modalRef.current?._closeModal}
      useNativeDriver
      avoidKeyboard
      propagateSwipe
      onSwipeComplete={undefined}
      swipeDirection={undefined}
      containerStyle={[
        {
          borderRadius: 20,
          backgroundColor: colors.background1,
          borderColor: colors.background1,
        },
      ]}
    />
  );
});

export default memo(Popups);
