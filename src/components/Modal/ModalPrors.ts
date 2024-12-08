export interface ModalPrors {
	active: boolean;
	anchorRef?: HTMLElement | null;
	setActive: (_: boolean) => void; // Параметр явно обозначен как неиспользуемый
}
