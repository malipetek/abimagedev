import React from 'react';

/**
 * @typedef {Object} ItemProps - Props for the Item component
 * @property {string} id - The ID of the item
 * @property {string} key - Whether the item should have an opacity of 0.5
 * @property {JSX.Element} [children] - Whether the item should have an opacity of 0.5
 * @property {boolean} [withOpacity] - Whether the item should have an opacity of 0.5
 * @property {boolean} [isDragging] - Whether the item is currently being dragged
 * @property {import('react').CSSProperties} [style] - Additional CSS styles for the item
 */

const Item = React.forwardRef(
  /**
   * @param {ItemProps} props - Props for the Item component
   * @param {React.ForwardedRef<HTMLDivElement>} ref - Ref for the Item component
   */
  ({ id, withOpacity, isDragging, style, ...props }, ref) => {
    /** @type {import('react').CSSProperties} */
    const inlineStyles = {
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        height: '140px',
        width: '140px',
        borderRadius: '10px',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: isDragging  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props} id={id}>{ props.children }</div>;
});

export default Item;
