export const styleMainDashboard = (theme, contentPadding) => ({
  containerNav: {
    flexShrink: {
      sm: 0
    },
    width: {
      sm: theme.customVariables.drawerWidth
    }
  },
  containerContent: {
    flexGrow: 1,
    padding: `calc(${contentPadding} + ${theme.customVariables.appBarHeight}) ${contentPadding} ${contentPadding} ${contentPadding}`,
    width: {
      sm: `calc(100% - ${theme.customVariables.drawerWidth})`
    }
  }
});
