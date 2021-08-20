const { ThemeBuilder, Theme } = require('tailwindcss-theming');

// Be careful in your color declarations. Only the declarations of the default theme will be taken into account. It means that if you have a tertiary color on a dark theme but not on the default theme, it will not be generated at all. This is by design in order to keep color palettes consistent between themes.

const mainTheme = new Theme()
  .default()
  .colors({
    'primary': '#F7B100',
    'accent': '#592E13',
    'blue': '#121258',
  })
;

const per2Theme = new Theme()
  .colors({
    'primary': '#F7B100',
    'accent': '#ffffff',
    'blue': '#121258',
  })
  .name('personas')
;

module.exports = new ThemeBuilder()
  .asDataThemeAttribute()
  .default(mainTheme)
  .theme(per2Theme)