/**
 * TV Focus Management utilities
 * Handles D-pad navigation for Android TV
 */

import { findNodeHandle, UIManager } from 'react-native';
import { RefObject } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface FocusableItem {
  ref: RefObject<any>;
  id: string;
  neighbors?: Partial<Record<Direction, string>>;
}

class FocusManager {
  private items: Map<string, FocusableItem> = new Map();
  private currentFocusId: string | null = null;

  register(item: FocusableItem) {
    this.items.set(item.id, item);
  }

  unregister(id: string) {
    this.items.delete(id);
  }

  focus(id: string) {
    const item = this.items.get(id);
    if (item?.ref?.current) {
      const handle = findNodeHandle(item.ref.current);
      if (handle) {
        UIManager.dispatchViewManagerCommand(handle, 'focus', []);
      }
      this.currentFocusId = id;
    }
  }

  navigate(direction: Direction) {
    if (!this.currentFocusId) return;
    const current = this.items.get(this.currentFocusId);
    const nextId = current?.neighbors?.[direction];
    if (nextId) {
      this.focus(nextId);
    }
  }

  getCurrentFocus() {
    return this.currentFocusId;
  }
}

export const focusManager = new FocusManager();
