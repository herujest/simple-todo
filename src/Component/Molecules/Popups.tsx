import React, {
  forwardRef,
  memo,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../Context/ThemeContext';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import Modal, {IModalData} from './Modal';
import Button from '../Atoms/Buttons';
import StackedLabelInput from './InputField';
import {ActivityDTO, ActivityTemplates} from '../../Screens/AddActivity';

export type PopupType = {
  modalTitle?: string;
  onClose?: () => any;
  children?: React.ReactNode | ReactElement;
  hideCloseBtn?: boolean;
};

export const InputGoalPopup = React.memo(
  ({
    initialValues,
    onDelete,
    onSave,
    error,
  }: {
    initialValues: {
      title: string;
      desc: string;
      dueDate: string;
      isComplete: boolean;
    };
    onSave: (val?: any) => void;
    onDelete: () => void;
    error?: string;
  }) => {
    const {colors, width} = useTheme();
    const [tempTitle, setTempTitle] = useState<string>('');
    const [tempDesc, setTempDesc] = useState<string>('');
    const [tempDueDate, setTempDueDate] = useState<string>('');
    const [tempIsComplete, setTempIsComplete] = useState<boolean>(false);

    useEffect(() => {
      setTempTitle(initialValues?.title);
      setTempDesc(initialValues?.desc);
      setTempDueDate(initialValues?.dueDate);
      setTempIsComplete(initialValues?.isComplete);
    }, [initialValues]);

    function toggleSwitch() {
      setTempIsComplete(prev => !prev);
    }

    function onSubmit() {
      const payload = {
        title: tempTitle,
        description: tempDesc,
        dueDate: tempDueDate,
        isComplete: tempIsComplete,
      };
      onSave(payload);
      console.log('payload', payload);
    }

    return (
      <View>
        {/* <Text variant="headline2">Goal Title</Text> */}
        <StackedLabelInput
          label="Goal Name*"
          onChangeText={setTempTitle}
          value={tempTitle}
          placeholder={'Type name of the goal'}
        />
        <StackedLabelInput
          label="Description"
          onChangeText={setTempDesc}
          value={tempDesc}
          placeholder={'Type your detail goal info'}
          multiline
          numberOfLines={4}
        />
        <Pressable
          onPress={toggleSwitch}
          style={[styles.radioItem, {marginBottom: width * 0.04}]}>
          <Text variant="headline3" style={{color: colors.basic4}}>
            Mark as done
          </Text>
          <Icon
            name={tempIsComplete ? 'radio-checked' : 'radio-unchecked'}
            color={tempIsComplete ? colors.color1 : colors.basic6}
            size={width * 0.08}
          />
        </Pressable>
        <Button
          type="secondary"
          title="Save"
          onPress={onSubmit}
          disabled={!tempTitle}
        />
        {initialValues?.title ? (
          <TouchableOpacity
            style={[styles.delete, {paddingVertical: width * 0.04}]}
            onPress={onDelete}>
            <Text variant="headline3" style={{color: colors.color8}}>
              Delete
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);

export const EditActivityPopup = React.memo(
  ({
    initialValues,
    onSave,
    error,
  }: {
    initialValues: {
      title: string;
      desc: string;
      asset_icon_name: string;
    };
    onSave: (val?: any) => void;
    error?: string;
  }) => {
    const {colors, width} = useTheme();
    const [tempTitle, setTempTitle] = useState<string>('');
    const [tempDesc, setTempDesc] = useState<string>('');
    const [tempAsset, setTempAsset] = useState<string>('');
    const [activeType, setActiveType] = useState<ActivityDTO | undefined>(
      ActivityTemplates[0],
    );

    useEffect(() => {
      setTempTitle(initialValues?.title);
      setTempDesc(initialValues?.desc);
      setTempAsset(initialValues?.asset_icon_name);
      setActiveType(
        ActivityTemplates.find(
          i => i.iconName === initialValues.asset_icon_name,
        ),
      );
    }, [initialValues]);

    function onSubmit() {
      const payload = {
        title: tempTitle,
        description: tempDesc,
        asset_icon_name: tempAsset,
      };
      onSave(payload);
      console.log('payload', payload);
    }

    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ActivityTemplates.map((item: ActivityDTO, index: number) => {
            const isActive = item.id === activeType.id;
            function _setActive() {
              setActiveType(item);
              setTempAsset(item.iconName);
            }

            return (
              <Pressable
                key={`template-act_${index}`}
                style={[styles.itemType]}
                onPress={_setActive}>
                <View
                  style={[
                    styles.icon,
                    isActive ? styles.active : undefined,
                    {backgroundColor: colors.background5},
                  ]}>
                  <Icon
                    name={item.iconName}
                    color={colors.color2}
                    size={width * 0.06}
                  />
                </View>
                <Text
                  variant="bodyText3Bold"
                  style={{color: isActive ? colors.basic4 : colors.basic3}}>
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <StackedLabelInput
          label="Goal Name*"
          onChangeText={setTempTitle}
          value={tempTitle}
          placeholder={'Type name of the goal'}
        />
        <StackedLabelInput
          label="Description"
          onChangeText={setTempDesc}
          value={tempDesc}
          placeholder={'Type your detail goal info'}
          multiline
          numberOfLines={4}
        />

        <Button
          type="secondary"
          title="Update"
          onPress={onSubmit}
          disabled={!tempTitle}
        />
      </View>
    );
  },
);

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
            <View style={styles.itemEnd}>
              <TouchableOpacity
                onPress={_onClose}
                style={{margin: width * 0.03}}>
                <Icon name="close" />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={[
              styles.modalTitle,
              {
                padding: width * 0.03,
                backgroundColor: colors.background1,
              },
            ]}>
            {modalDataConfig.modalTitle ? (
              <Text
                variant="headline2"
                style={[
                  styles.textCenter,
                  {
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
      swipeDirection={null}
      containerStyle={[
        styles.modalTitle,
        {
          backgroundColor: colors.background1,
          borderColor: colors.background1,
        },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  itemEnd: {alignItems: 'flex-end'},
  modalTitle: {
    borderRadius: 20,
  },
  textCenter: {textAlign: 'center'},
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemType: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 5,
    padding: 15,
  },
  active: {
    borderWidth: 3,
    borderColor: '#A1A3F6',
  },
});

export default memo(Popups);
