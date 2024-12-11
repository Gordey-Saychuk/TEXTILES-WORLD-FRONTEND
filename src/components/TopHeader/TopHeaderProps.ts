export interface TopHeaderProps {
  setActive: (active: boolean) => void;
  setAnchorRef: (ref: HTMLElement | null) => void;
  openModal: (content: React.ReactNode) => void;
}
  