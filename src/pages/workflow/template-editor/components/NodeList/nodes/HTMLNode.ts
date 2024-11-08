import { Shape } from '@antv/x6';

const registerCustomHTMLNode = () => {
  Shape.HTML.register({
    shape: 'custom-html',
    width: 160,
    height: 80,
    effect: ['data'],
    html(cell) {
      const { color } = cell?.getData?.() || {};

      const outerDiv = document.createElement('div');
      outerDiv.style.position = 'relative';
      outerDiv.style.width = '100%';
      outerDiv.style.height = '100%';
      outerDiv.style.backgroundColor = color || '#333232';
      outerDiv.style.borderRadius = '1em';
      outerDiv.style.boxShadow = '0 0.125em 0.3125em rgba(0, 0, 0, 0.25), 0 0.02125em 0.06125em rgba(0, 0, 0, 0.25)';
      outerDiv.style.perspective = '600px';

      // 创建内层 div
      const innerDiv = document.createElement('div');
      innerDiv.style.position = 'absolute';
      innerDiv.style.top = '50%';
      innerDiv.style.left = '0';
      innerDiv.style.width = '100%';
      innerDiv.style.height = '50%';
      innerDiv.style.backgroundColor = '#333232';
      innerDiv.style.borderBottomLeftRadius = '1em';
      innerDiv.style.borderBottomRightRadius = '1em';
      innerDiv.style.backgroundImage = 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4))';
      innerDiv.style.transformOrigin = 'top';
      innerDiv.style.transform = 'rotateX(180deg)';
      innerDiv.style.transition = 'transform 0.7s ease-in-out';

      // 添加悬停效果
      outerDiv.addEventListener('mouseover', () => {
        innerDiv.style.transform = 'rotateX(0deg)';
      });

      outerDiv.addEventListener('mouseout', () => {
        innerDiv.style.transform = 'rotateX(180deg)';
      });

      // 将内层 div 添加到外层 div 中
      outerDiv.appendChild(innerDiv);
      return outerDiv;
    }
  });
};

export default registerCustomHTMLNode;
