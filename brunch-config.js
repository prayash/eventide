// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  }
}

exports.npm = {
  aliases: {
    react: 'preact'
  }
}

exports.plugins = {
  babel: {
    presets: ['latest'],
    plugins: [['transform-react-jsx', { pragma: 'h' }]]
  }
}
