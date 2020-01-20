export class PraDocumentItem {
	ID: number;
	PraticaID: number;
	Nome: string;	// File	name	without	extension
	Estensione: string; // File	extension
	Filename: string; // Complete	File	name
	HasThumbnail: boolean; // File	has	thumbnail
	Riservato: boolean;	// Reserved	file
	AzureStorage: boolean; //	File	is	in	Azure	Storage
	Watermark: boolean; // File	is	Watermark
	DataInserimento: Date; // File	Insert	Date
	Url: string; // Absolute	file	url
	Thumb: string; // Absolute	thumb	url
	IsImage?: boolean;
	TipoId: number;
};