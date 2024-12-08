export interface ModalPrors {
	active: boolean;
	anchorRef?: HTMLElement | null;
	setActives: (_: boolean) => void; // Параметр явно обозначен как неиспользуемый
}
 