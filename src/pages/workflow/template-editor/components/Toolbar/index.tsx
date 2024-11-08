// 文件路径: src/components/NodeList.tsx

import React from 'react';
import { saveAs } from 'file-saver';
import { Button, Space, message } from 'antd';
import type { GraphContextType } from '../../context/graph.context';
import { useGraphContext } from '../../context/graph.context';
import { useDataContext } from '../../context/data.context';

const Toolbar: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { graph, history } = useGraphContext() as GraphContextType;
  const { progress, setProgress } = useDataContext();

  const handleZoomIn = () => {
    if (graph) graph.zoom(0.1);
  };

  const handleZoomOut = () => {
    if (graph) graph.zoom(-0.1);
  };

  const handleUndo = () => {
    if (graph) graph.undo();
  };

  const handleRedo = () => {
    if (graph) graph.redo();
  };

  const handleExportJSON = () => {
    if (!graph) {
      return;
    }
    const data = graph.toJSON();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'diagram.json');
    message.success('导出 JSON 成功');
    console.log('导出的 JSON 数据:', data);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const parsedData = JSON.parse(result);
          graph.fromJSON(parsedData);
          console.log('导入的 JSON 数据:', parsedData);
        }
      } catch (error) {
        message.error('导入JSON 失败');
        console.log('导出的 JSON 数据失败:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="bg-white text-center">
      <Space>
        <Button
          onClick={() => {
            graph.zoomTo(1);
            graph.centerContent();
          }}
        >
          居中
        </Button>
        <Button onClick={handleZoomIn}>放大</Button>
        <Button onClick={handleZoomOut}>缩小</Button>
        <Button
          disabled={!history.canUndo}
          onClick={handleUndo}
        >
          撤销
        </Button>
        <Button
          disabled={!history.canRedo}
          onClick={handleRedo}
        >
          重做
        </Button>
        <input
          type="file"
          className="hidden"
          accept=".json"
          ref={fileInputRef}
          onChange={handleImportJSON}
        />
        <Button onClick={handleExportJSON}>导出 JSON</Button>
        <Button onClick={() => fileInputRef.current?.click()}>导入 JSON</Button>
        <Button onClick={() => graph?.exportSVG?.('diagram.svg', { copyStyles: false })}>导出 SVG</Button>
        <Button onClick={() => graph?.exportSVG?.('diagram.png', { copyStyles: false })}>导出 PNG</Button>
        <Button onClick={() => graph?.exportJPEG?.('diagram.jpg', { copyStyles: false })}>导出 JPG</Button>
        <Button onClick={() => setProgress(progress + 10)}>增加进度</Button>
      </Space>
    </section>
  );
};

export default Toolbar;
