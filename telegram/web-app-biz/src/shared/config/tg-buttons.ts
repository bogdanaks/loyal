export const activeButtonParams = (text: string) => ({
  text,
  is_visible: true,
  is_active: true,
  text_color: "#fcfcfc",
  color: "#4c38ff",
});

export const disabledButtonParams = (text: string) => ({
  text,
  is_visible: true,
  is_active: false,
  text_color: "#97a6ff",
  color: "#becaff",
});
