export const SINGLE = 1;
export const EP = 2;
export const ALBUM = 3;

export default [
  {
    type: SINGLE,
    name: "Single",
    description: "1-3 tracks, and a total duration of 30 minutes or less."
  },
  {
    type: EP,
    name: "EP",
    description: "4-6 tracks, and a total duration of 30 minutes or less."
  },
  {
    type: ALBUM,
    name: "Album",
    description: "7 tracks or more, and a total duration of 30 minutes or more."
  }
];
