module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint --edit $HUSKY_GIT_PARAMS',
  },
};
