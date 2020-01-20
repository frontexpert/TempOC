export const API_URL: string = 'http://tablet2.oxygencar.it';
//export const API_URL: string = 'http://localhost:13379';
//export const OXYGEN_URL: string = 'http://oxygen2.ilcarrozziere.it/';
export const OXYGEN_URL: string = 'http://app.oxygencar.it/';

export const PRATICHE_TAB_VALUES = [
  {text: 'outlook', value: 0}, 
  {text: 'pagamento', value: 1},
  {text: 'foto', value: 2},
  {text: 'documenti', value: 3},
  {text: 'preventivi', value: 4},
  {text: 'noleggi', value: 5}
];

export const PRATICHE_TAB_VALUES_1 = [
  {text: 'outlook', value: 0},
  {text: 'foto', value: 2},
  {text: 'documenti', value: 3},
  {text: 'preventivi', value: 4},
  {text: 'noleggi', value: 5}
];

export const COLORS = {
  NON_ASSEGNATO: 1,
  GREEN: 2,
  YELLOW: 3,
  RED: 4,
  BLUE: 5,
  ORANGE: 6,
  PURPLE: 7,
  WHITE: 8
};

export const APERTE_FIRST_VALUES = [
  {text: 'veicolo', value: 0}, 
  {text: 'cliente', value: 1},
];

export const APERTE_SECOND_VALUES = [
  {text: 'veicolo', value: 0}, 
  {text: 'cliente', value: 1},
  {text: 'sinistro', value: 2}
];


export const APERTE_TAB_VALUES = [
  {text: 'veicolo', value: 0}, 
  {text: 'cliente', value: 1},
  {text: 'sinistro', value: 2},
  {text: 'controparte', value: 3},
];

export const PRATICA_NOLEGGIO_VALUES = [
  {text: 'veicolo', value: 0}, 
  {text: 'cliente', value: 1}
];

export const NOLEGGIO_TAB_VALUES = [
  {text: 'UTILIZZATORE', value: 0}, 
  {text: 'CONSEGNA A', value: 1},
  {text: 'SECONDO UTILIZZATORE', value: 2},
  {text: 'STATO VEICOLO', value: 3},
  {text: 'DETTAGLIO', value: 4},
];

export const END_NOLEGGIO_TAB_VALUES = [
  {text: 'STATO VEICOLO', value: 0},
  {text: 'DETTAGLIO', value: 1},
];


export const PHOTOS_KEY: string = 'photoes';

export const DOCUEMTNS_KEY: string = 'documents';


/**
 * Each  creation  case,  if  tabbed:
 * has  a  TipoID  value  to  be  passed  to  the  insert  views
 */
export const CREATION_CASE = {
  RIPARAZIONE_MANUTENZIONE_CHECKUP: 100,
  RIMBORSO_ASSICURATIVO_RCA: 1,
  RADD_KASCO: 3, // RIMBORSO  ASSICURATIVO  DANNI  DIVERSI has subcases with different TipoID
  RADD_ATTI_VANDALICI: 4,
  RADD_EVENTI_NATURALI_GRANDINE: 5,
  RADD_FURTO_PARZIALE: 6,
  RADD_CRISTALLI: 7,
  RADD_RESPONSABILITA_DIRETTA: 8,
  RADD_ALTRI_DANNI: 9,
  NOLEGGIO: 101
};

export const BAREME: number[][] =  [
  [0,  1,  3,  3,  3,  3,  3,  0,  3,  0,  3,  3,  0,  0,  3,  3,  1,  3],  //  00
  [3,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3],  //  01
  [1,  1,  2,  2,  2,  2,  3,  3,  2,  1,  1,  1,  1,  1,  3,  3,  1,  2],  //  02
  [1,  1,  2,  2,  2,  2,  1,  1,  3,  0,  0,  0,  1,  1,  3,  3,  0,  3],  //  03
  [1,  1,  2,  2,  2,  2,  1,  1,  2,  1,  1,  1,  1,  1,  2,  3,  1,  2],  //  04
  [1,  1,  2,  2,  2,  2,  1,  1,  3,  1,  0,  0,  1,  0,  3,  3,  1,  3],  //  05
  [1,  1,  1,  3,  3,  3,  2,  1,  3,  0,  3,  0,  3,  0,  3,  3,  1,  3],  //  06
  [0,  1,  1,  3,  3,  3,  3,  2,  3,  2,  3,  3,  3,  3,  3,  3,  1,  3],  //  07
  [1,  1,  2,  1,  2,  1,  1,  1,  0,  0,  2,  1,  1,  1,  3,  0,  1,  2],  //  08
  [0,  1,  3,  0,  3,  3,  0,  2,  0,  2,  3,  3,  3,  3,  3,  3,  0,  3],  //  09
  [1,  1,  3,  0,  3,  0,  1,  1,  2,  1,  2,  1,  1,  1,  2,  3,  1,  3],  //  10
  [1,  1,  3,  0,  3,  0,  0,  1,  3,  1,  3,  2,  1,  2,  3,  3,  1,  2],  //  11
  [0,  1,  3,  3,  3,  3,  1,  1,  3,  1,  3,  3,  2,  0,  3,  3,  1,  3],  //  12
  [0,  1,  3,  3,  3,  0,  0,  1,  3,  1,  3,  2,  0,  2,  3,  3,  1,  3],  //  13
  [1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  2,  1,  1,  1,  2,  2,  1,  2],  //  14
  [1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  2,  2,  1,  2],  //  15
  [3,  1,  3,  0,  3,  3,  3,  3,  3,  0,  3,  3,  3,  3,  3,  3,  2,  3],  //  16
  [1,  1,  2,  1,  2,  1,  1,  1,  2,  1,  1,  2,  1,  1,  2,  2,  1,  2]  //  17
];

export const PRESENT_RESPONSIBILITY: string[] = [
  "Dinamica  non  compatibile",
  "Torto",
  "Concorso",
  "Ragione"
];