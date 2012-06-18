// Generated by CoffeeScript 1.3.1
(function() {

  this.Kujua = {};

  this.Kujua.Clinic = Backbone.Model.extend({});

  this.Kujua.ClinicList = Backbone.Collection.extend({
    model: Kujua.Clinic,
    comparator: function(clinic) {
      return clinic.get('name');
    },
    parse: function(response) {
      return response.rows;
    },
    url: function() {
      return 'clinics.json';
    }
  });

  this.Kujua.ClinicView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click a': 'select'
    },
    initialize: function(options) {
      this.parent = options.parent;
      this.model.bind('change', this.render, this);
      return this.model.bind('destroy', this.remove, this);
    },
    render: function() {
      var contact, name, phone, _ref;
      _ref = this.model.get('value'), contact = _ref.contact, name = _ref.name;
      phone = contact.phone;
      this.$el.html("<a href=\"#\">" + name + " (" + phone + ")</a>");
      return this;
    },
    select: function() {
      return this.parent.trigger('update', this.model.get('value'));
    }
  });

  this.Kujua.ClinicsView = Backbone.View.extend({
    initialize: function(options) {
      var _ref;
      this.data = options.data;
      _ref = this.data, this._id = _ref._id, this._rev = _ref._rev;
      this.make();
      $('.container > .content').append(this.el);
      this.clinics = new Kujua.ClinicList();
      this.clinics.bind('reset', this.addAll, this);
      this.render();
      this.clinics.fetch();
      return this.bind('update', this.onUpdate, this);
    },
    onUpdate: function(clinic) {
      var record, _ref;
      record = _.extend({}, this.data);
      if ((_ref = record.related_entities) != null) {
        _ref.clinic = clinic;
      }
      delete record._key;
      $(document).trigger('save-record', record);
      this.$el.find('.modal').modal('hide');
      return this.remove();
    },
    addAll: function() {
      return this.clinics.each(function(clinic) {
        return this.$list.append(new Kujua.ClinicView({
          parent: this,
          model: clinic
        }).render().el);
      }, this);
    },
    render: function() {
      var clinic_name, related_entities, _id, _ref, _ref1, _rev;
      _ref = this.data, _id = _ref._id, _rev = _ref._rev, related_entities = _ref.related_entities;
      clinic_name = (related_entities != null ? (_ref1 = related_entities.clinic) != null ? _ref1.name : void 0 : void 0) || 'No Clinic';
      this.$el.html("<form id=\"" + _id + "\" action=\"\" method=\"POST\" class=\"hide modal fade\">\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n    <h3>Update Record</h3>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"btn-group\">\n      <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n        Clinic: " + clinic_name + "\n        <span class=\"caret\"></span>\n      </a>\n      <ul class=\"dropdown-menu\">\n      </ul>\n    </div>\n  </div>\n</form>");
      this.$list = this.$('ul');
      this.$clinic_name = this.$('a.dropdown-toggle');
      this.$el.find('.modal').modal('show');
      return this;
    }
  });

}).call(this);
