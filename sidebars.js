/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // Only expose the Claude Code category in the docs sidebar.
  // (Prometheus docs remain on disk but are hidden from navigation.)
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Claude Code',
      link: {type: 'doc', id: 'claude-code/overview'},
      items: ['claude-code/overview', 'claude-code/subagents'],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};
