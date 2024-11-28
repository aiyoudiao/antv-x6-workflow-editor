/**
 * 人员节点抽屉 帮我写一个抽屉，里面有人员选择器，人员选择器下面有三个按钮，分别是：添加、删除、确定 人员选择器使用antd的Select组件，三个按钮使用antd的Button组件 抽屉的宽度是300px，高度是400px
 * 抽屉的标题是“选择人员” 人员选择器默认值是“请选择人员” 人员选择器可以选择多个人员，选择的人员会显示在人员选择器下面 三个按钮的文案分别是：添加、删除、确定 确定按钮点击后，抽屉关闭，同时返回选择的人员
 */

import React, { useState } from 'react';
import { Button, Drawer, Select, Space } from 'antd';

interface CCPeopleDrawerProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedPeople: string[]) => void;
}

const CCPeopleDrawer: React.FC<CCPeopleDrawerProps> = ({ visible, onClose, onConfirm }) => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);

  // 模拟人员数据
  const peopleOptions = [
    { label: '张三', value: 'zhangsan' },
    { label: '李四', value: 'lisi' },
    { label: '王五', value: 'wangwu' }
  ];

  const handleAdd = () => {
    if (currentSelection.length > 0) {
      setSelectedPeople([...selectedPeople, ...currentSelection]);
      setCurrentSelection([]);
    }
  };

  const handleDelete = () => {
    setSelectedPeople([]);
  };

  const handleConfirm = () => {
    onConfirm(selectedPeople);
    onClose();
  };

  return (
    <Drawer
      title="选择人员"
      placement="right"
      width={300}
      height={400}
      onClose={onClose}
      open={visible}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Select
          mode="multiple"
          style={{ width: '100%', marginBottom: 16 }}
          placeholder="请选择人员"
          value={currentSelection}
          onChange={setCurrentSelection}
          options={peopleOptions}
        />

        <div style={{ marginBottom: 16 }}>
          已选人员：
          {selectedPeople.map(person => (
            <div key={person}>{peopleOptions.find(opt => opt.value === person)?.label}</div>
          ))}
        </div>

        <Space style={{ marginTop: 'auto' }}>
          <Button onClick={handleAdd}>添加</Button>
          <Button onClick={handleDelete}>删除</Button>
          <Button
            type="primary"
            onClick={handleConfirm}
          >
            确定
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};

export default CCPeopleDrawer;
