import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

import { Button, Modal, View } from '@/components/ui';

type CustomModalProps = {
  onCancel: () => void;
  onDelete: () => void;
};

const DeleteModal = forwardRef<BottomSheetModal, CustomModalProps>(
  ({ onDelete, onCancel }, ref) => {
    return (
      <Modal ref={ref} index={0} snapPoints={['30%']} title={'Delete?'}>
        <View className="flex-1">
          <View className="my-8 w-full flex-1 gap-4 px-4">
            <Button className="bg-orange" label={'Delete'} onPress={onDelete} />
            <Button variant={'inactive'} label={'Cancel'} onPress={onCancel} />
          </View>
        </View>
      </Modal>
    );
  }
);

export default DeleteModal;
