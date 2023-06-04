import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./SortableItem.css";

interface Props {
  id: UniqueIdentifier;
  index: number;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {}
});


export function SortableItem({ children, id, index }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-space-between',
    alignItems: "flex-start"
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div className="SortableItem" ref={setNodeRef} style={style} {...attributes} {...listeners} >
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}

