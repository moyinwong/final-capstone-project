export const SWITCH = "@@DARK_MODE/SWITCH";

interface ISwitchDarkMode {
  type: typeof SWITCH;
  mode: Boolean;
}

// Action Creator
export const switchDarkMode = (newMode: Boolean): ISwitchDarkMode => {
  return {
    type: SWITCH,
    mode: newMode,
  };
};

export type IDarkModeActions = ISwitchDarkMode;
