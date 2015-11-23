'use strict';
let generator = require('yeoman-generator');
let utils = require('../../utils/all');

module.exports = generator.NamedBase.extend({

  constructor: function() {
    generator.NamedBase.apply(this, arguments);

    this.option('stateless', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });

    this.option('transmit', {
      desc: 'Add Transmit boilerplate',
      defaults: true
    });

    this.argument('transmitFragmentName', {
      desc: 'Transmit fragment name',
      type: String,
      defaults: 'myFragment',
      required: false
    });
  },

  writing: function() {

    let settings = utils.yeoman.getAllSettingsFromComponentName(this.name, this.config.get('style'));
    let componentType = this.options.stateless ? 'Stateless' : 'Base';

    settings.transmitFragmentName = this.transmitFragmentName;
    settings.componentUsesTransmit = this.options.transmit;

    // Create the style template
    this.fs.copyTpl(
      this.templatePath(`styles/Component${settings.style.suffix}`),
      this.destinationPath(settings.style.path + settings.style.fileName),
      settings
    );

    // Create the component
    this.fs.copyTpl(
      this.templatePath(`components/${componentType}.js`),
      this.destinationPath(settings.component.path + settings.component.fileName),
      settings
    );

    // Create the unit test
    this.fs.copyTpl(
      this.templatePath('tests/Base.js'),
      this.destinationPath(settings.test.path + settings.test.fileName),
      settings
    );
  }
});
