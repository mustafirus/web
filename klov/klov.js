//version 11

Ext.Loader.setConfig({
    enabled: true
});
//Ext.Loader.setPath('Ext.ux', '/ext4/examples/ux');

Ext.require([
'Ext.selection.CellModel',
'Ext.grid.*',
'Ext.data.*',
'Ext.util.*',
'Ext.state.*',
'Ext.form.*'
]);

Ext.form.field.ComboBox.override({
    beforeBlur: function() {
        var me = this;
        me.doQueryTask.cancel();
        
        me.assertValue();
    },

    // private
    assertValue: function() {
        var me = this,
            value = me.getRawValue(),
            rec;

        if (me.forceSelection) {
            if (me.multiSelect) {
                // For multiselect, check that the current displayed value matches the current
                // selection, if it does not then revert to the most recent selection.
                if (value !== me.getDisplayValue()) {
                    me.setValue(me.lastSelection);
                }
            } else {
                // For single-select, match the displayed value to a record and select it,
                // if it does not match a record then revert to the most recent selection.
                rec = me.findRecordByDisplay(value);
                if (rec) {
                    me.select(rec);
                } else {
                    me.setValue(me.lastSelection);
                }
            }
        }
        me.collapse();
    },    
});  

Ext.form.field.ComboBox.override({
    
    setValue: function(value, doSelect) {
        var me = this,
            valueNotFoundText = me.valueNotFoundText,
            inputEl = me.inputEl,
            i, len, record,
            models = [],
            displayTplData = [],
            processedValue = [];

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            me.value = value;
            return me;
        }

        // This method processes multi-values, so ensure value is an array.
        value = Ext.Array.from(value);

        // Loop through values
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                var tmpRecord = me.findRecordByValue(record);
                
                record = tmpRecord;
                
            }
            // record found, select it.
            if (record) {
                models.push(record);
                displayTplData.push(record.data);
                processedValue.push(record.get(me.valueField));
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            else {
                if (!me.forceSelection) {
                     // BUGFIX: if we don't force a selection, we may never display "valueNotFoundText" - but display the original value instead.
                    displayTplData.push(value[i]);
                } else {
                    // if valueNotFoundText is defined, display it, otherwise display nothing for this value
                    if (Ext.isDefined(valueNotFoundText)) {
                        displayTplData.push(valueNotFoundText);
                    }
                }
                processedValue.push(value[i]);
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
            me.value = null;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method
        me.lastSelection = me.valueModels = models;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        if (doSelect !== false) {
            me.syncSelection();
        }
        me.applyEmptyText();

        return me;
    }
});  

Ext.onReady(function () {

    function formatDate(value){
        return value ? Ext.Date.dateFormat(value, 'd/m/Y') : '';
    }
    
    Ext.define('Client', {
        extend: 'Ext.data.Model',
        fields:[
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {   name: 'common', type: 'string'      },
        {   name: 'street', type: 'string'      },
        {   name: 'house', type: 'string'       },
        {   name: 'city', type: 'string'        },
        {   name: 'region', type: 'string'      },
        {   name: 'phone', type: 'string'       },
        {   name: 'director', type: 'string'    },
        ]
    });

    Ext.define('Prop', {
        extend: 'Ext.data.Model',
        fields:[
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {   name: 'name', type: 'string'      },
        {   name: 'capt', type: 'string'      },
        {   name: 'value', type: 'string'     },
        ]
    });
    
    Ext.define('Sertificate', {
        extend: 'Ext.data.Model',
        fields:[
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {
            name: 'idd', type: 'number'
        }, {
            name: 'serial', type: 'string'
        }, {
            name: 'num', type: 'string'
        }, {
            name: 'date', type: 'date'
        }, {
            name: 'cultura', type: 'string'
        }, {
            name: 'sort', type: 'string'
        }, {
            name: 'part', type: 'string'
        }, {
            name: 'act', type: 'string'
        }, {
            name: 'vmist', type: 'float'
        }, {
            name: 'vologost', type: 'float'
        }, {
            name: 'shogest', type: 'float'
        }, {
            name: 'energy', type: 'float'
        }, {
            name: 'masa1000', type: 'float'
        }, {
            name: 'inf1', type: 'string'
        }, {
            name: 'inf2', type: 'string'
        }, {
            name: 'inf3', type: 'string'
        }]
    });
    
    Ext.define('Svidoctvo', {
        extend: 'Ext.data.Model',
        fields:[
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {
            name: 'idd', type: 'number'
        }, {
            name: 'client', type: 'string'
        }, {
            name: 'sertificate', type: 'number'
        }, {
            name: 'masa', type: 'float'
        },]
    });
    
    Ext.define('selClient', {
        extend: 'Ext.data.Model',
        fields:[
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {
            name: 'common', type: 'string'
        },]
    });
    
    Ext.define('selSertificate', {
        extend: 'Ext.data.Model',
        fields:[
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {
            name: 'idd', type: 'number'
        }, {
            name: 'desc', type: 'string'
        },]
    });
    Ext.define('selField', {
        extend: 'Ext.data.Model',
        fields:[
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {
            name: 'col', type: 'string'
        },]
    });

    // create the Data Store
    var props = Ext.create('Ext.data.Store', {
        autoLoad: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Prop',
        proxy: {
            type: 'ajax',
            destroy: null,
            // load remote data using HTTP
            url: 'store.php?name=props',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'prop'
            },
            writer: {
                type: 'xml',
                // records will have a 'plant' tag
                header: '<?xml version="1.0" encoding="utf-8"?>',
                documentRoot: 'props',
                record: 'prop',
                writeAllFields: true
            }
        },
        sorters:[ {
            property: 'common',
            direction: 'ASC'
        }]
    });
/*    var maxmasa=-1;
    props.load(function(){
        maxmasa=0;
    });
    while(maxmasa!=0){
        setTimeout(null,120);
    }
    maxmasa = props.find('name', 'maxmasa');
    maxmasa = maxmasa < 0 ? 0 : props.getAt(maxmasa).data.value; 
*/
    var clients = Ext.create('Ext.data.Store', {
        autoLoad: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Client',
        proxy: {
            type: 'ajax',
            destroy: null,
            // load remote data using HTTP
            url: 'store.php?name=clients',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'client'
            },
            writer: {
                type: 'xml',
                // records will have a 'plant' tag
                header: '<?xml version="1.0" encoding="utf-8"?>',
                documentRoot: 'clients',
                record: 'client',
                writeAllFields: true
            }
        },
        sorters:[ {
            property: 'common',
            direction: 'ASC'
        }]
    });
    
    var sertificates = Ext.create('Ext.data.Store', {
        autoLoad: true,
        lazyRender: true,
        
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Sertificate',
        proxy: {
            type: 'ajax',
            destroy: null,
            // load remote data using HTTP
            url: 'store.php?name=sertificates',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'sertificate'
            },
            writer: {
                type: 'xml',
                // records will have a 'plant' tag
                header: '<?xml version="1.0" encoding="utf-8"?>',
                documentRoot: 'sertificates',
                record: 'sertificate',
                writeAllFields: true
            }
        },
        sorters:[ {
            property: 'id',
            direction: 'ASC'
        }]
    });
    var svidoctos = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Svidoctvo',
        proxy: {
            type: 'ajax',
            destroy: null,
            // load remote data using HTTP
            url: 'store.php?name=svidoctvos',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'svidoctvo'
            },
            writer: {
                type: 'xml',
                // records will have a 'plant' tag
                header: '<?xml version="1.0" encoding="utf-8"?>',
                documentRoot: 'svidoctvos',
                record: 'svidoctvo',
                writeAllFields: true
            }
        },
        sorters:[ {
            property: 'idd',
            direction: 'ASC'
        }]
    });

    var atestats = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Svidoctvo',
        proxy: {
            type: 'ajax',
            destroy: null,
            // load remote data using HTTP
            url: 'store.php?name=atestats',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'atestat'
            },
            writer: {
                type: 'xml',
                // records will have a 'plant' tag
                header: '<?xml version="1.0" encoding="utf-8"?>',
                documentRoot: 'atestats',
                record: 'atestat',
                writeAllFields: true
            }
        },
        sorters:[ {
            property: 'idd',
            direction: 'ASC'
        }]
    });
    
    selClients = Ext.create('Ext.data.Store', {
        autoLoad: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'selClient',
        proxy: {
            type: 'ajax',
            // load remote data using HTTP
            url: 'store.php?name=clients',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'client'
            }
        },
        sorters:[ {
            property: 'common',
            direction: 'ASC'
        }]
    });
    
    selSertificates = Ext.create('Ext.data.Store', {
        autoLoad: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'selSertificate',
        proxy: {
            type: 'ajax',
            // load remote data using HTTP
            url: 'sertificates_desc.php?all=0',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'sertificate'
            },
        },
        sorters:[ {
            property: 'id',
            direction: 'ASC'
        }]
    });

    renSertificates = Ext.create('Ext.data.Store', {
        autoLoad: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'selSertificate',
        proxy: {
            type: 'ajax',
            // load remote data using HTTP
            url: 'sertificates_desc.php?all=1',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'sertificate'
            },
        },
        sorters:[ {
            property: 'id',
            direction: 'ASC'
        }]
    });

    selFieldConfig = {
        autoLoad: true,
        
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'selField',
        proxy: {
            type: 'ajax',
            // specify a XmlReader (coincides with the XML format of the returned data)
            reader: {
                type: 'xml',
                // records will have a 'plant' tag
                record: 'row'
            }
        },
        sorters:[ {
            property: 'row',
            direction: 'ASC'
        }]
    };
    // load remote data using HTTP
    selFieldConfig.proxy.url = 'selfield.php?st=clients&fl=city';
    selCliCity = Ext.create('Ext.data.Store', selFieldConfig);
    selFieldConfig.proxy.url = 'selfield.php?st=clients&fl=region';
    selCliReg = Ext.create('Ext.data.Store', selFieldConfig);
    selFieldConfig.proxy.url = 'selfield.php?st=sertificates&fl=cultura';
    selSertCult = Ext.create('Ext.data.Store', selFieldConfig);
    selFieldConfig.proxy.url = 'selfield.php?st=sertificates&fl=sort';
    selSertSort = Ext.create('Ext.data.Store', selFieldConfig);

    // create the grid and specify what field you want
    // to use for the editor at each header.
    //    clientsGrid = Ext.create('Ext.grid.Panel', );
    var vp = new Ext.container.Viewport({
        layout: 'border',
        items:[ {
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1> Программа для клова</h1>',
            height: 30
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            margins: '5 5 5 0',
            activeTab: 0,
            items:[ {
                ////////////   START Props !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                title: 'Настройки',
                xtype: 'grid',
                layout: 'fit',
                store: props,
                //                frame: true,
                columns:[ {
                    header: 'Property',
                    dataIndex: 'name',
                    width: 10,
                    field: {
                        allowBlank: false
                    }
                }, {
                    header: 'Настройка',
                    dataIndex: 'capt',
                    width: 200,
                    field: {
                        allowBlank: false
                    }
                }, {
                    header: 'Значение',
                    dataIndex: 'value',
                    width: 400,
                    field: {
                        allowBlank: false
                    }
                }],
                selModel: {
                    selType: 'cellmodel'
                },
                tbar:[ {
                    text: 'Сохранить',
                    handler: function () {
                        props.sync();
                    }
                }],
                plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
                ////////////   END Props   !!!!!!!!!!!!!!!!!!!!!!!!!!!!
            },
            ////////////    clients!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {
                ////////////    clients
                //        autoRender: true,
                title: 'Клиенты',
                xtype: 'grid',
                layout: 'fit',
                store: clients,
                //                frame: true,
                columns:[ {
                    //            id: 'client_id',
                    header: 'Наименование',
                    dataIndex: 'common',
                    width: 230,
//                    flex: 1,
                    field: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Улица',
                    dataIndex: 'street',
                    width: 130,
                    field: {
                    }
                },
                {
                    header: 'Дом',
                    dataIndex: 'house',
                    width: 130,
                    field: {
                    }
                },
                {
                    header: 'Город',
                    dataIndex: 'city',
                    width: 130,
                    field: {
                        allowBlank: true,
                        xtype: 'combobox',
                        store: selCliCity,
                        displayField: 'col',
                        valueField: 'col',
                        typeAhead: false,
                        autoSelect: false,
                        triggerAction: 'all',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                },
                {
                    header: 'Область',
                    dataIndex: 'region',
                    width: 130,
                    field: {
                        allowBlank: true,
                        xtype: 'combobox',
                        store: selCliReg,
                        displayField: 'col',
                        valueField: 'col',
                        typeAhead: false,
                        autoSelect: false,
                        triggerAction: 'all',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                },
                {
                    header: 'Тел',
                    dataIndex: 'phone',
                    width: 70,
                    align: 'right',
                    field: {
                    }
                }, {
                    header: 'Директор',
                    dataIndex: 'director',
                    width: 95,
                    field: {
                    }
                }, {
                    header: 'Action',
                    xtype: 'actioncolumn',
                    width: 30,
                    items:[ {
                        icon: '/ext4/examples/shared/icons/fam/delete.gif', // Use a URL in the icon config
                        tooltip: 'Удалить',
                        handler: function (grid, rowIndex, colIndex) {
                            clients.removeAt(rowIndex);
                        }
                    }]
                }],
                selModel: {
                    selType: 'cellmodel'
                },
                
                tbar:[ {
                    text: 'Новый клиент',
                    handler: function () {
                        // Create a record instance through the ModelManager
                        var r = Ext.ModelManager.create({
                            common: 'Новый клиент',
                            address: '',
                            phone: '',
                            director: '',
                        },
                        'Client');
                        clients.insert(0, r);
                    }
                }, {
                    text: 'Сохранить',
                    handler: function () {
                        clients.sync();
                        selClients.load();
                    }
                }],
                plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
                ////////////   END clients!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }, {
                ////////////   START Sertificates !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                title: 'Сертификаты',
                xtype: 'grid',
                layout: 'fit',
                store: sertificates,
                columns:[ {
                    //            id: 'sertificate_id',
                    header: 'idd',
                    dataIndex: 'idd',
                    width: 30,
                    field: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Серия',
                    dataIndex: 'serial',
                    width: 130,
                    field: {
                    }
                },
                {
                    header: '№',
                    dataIndex: 'num',
                    width: 70,
                    align: 'right',
                    field: {
                    }
                },
                {
                    header: 'Дата',
                    dataIndex: 'date',
                    width: 70,
                    align: 'right',
                    renderer: formatDate,
                    field: {
                        xtype: 'datefield',
                        format: 'd/m/y',
                    }
                },
                {
                    header: 'Культура',
                    dataIndex: 'cultura',
                    width: 95,
                    field: {
                        allowBlank: true,
                        xtype: 'combobox',
                        store: selSertCult,
                        displayField: 'col',
                        valueField: 'col',
                        typeAhead: false,
                        autoSelect: false,
                        triggerAction: 'all',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                },
                {
                    header: 'Сорт',
                    dataIndex: 'sort',
                    width: 95,
                    field: {
                        allowBlank: true,
                        xtype: 'combobox',
                        store: selSertSort,
                        displayField: 'col',
                        valueField: 'col',
                        typeAhead: false,
                        autoSelect: false,
                        triggerAction: 'all',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                },
                {
                    header: 'Партія',
                    dataIndex: 'part',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Акт апробації',
                    dataIndex: 'act',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Чистота',
                    dataIndex: 'vmist',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Вологість',
                    dataIndex: 'vologost',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Схожесть',
                    dataIndex: 'shogest',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Енергия',
                    dataIndex: 'energy',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Масса на 1000',
                    dataIndex: 'masa1000',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Инфекция 1',
                    dataIndex: 'inf1',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Инфекция 2',
                    dataIndex: 'inf2',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Инфекция 3',
                    dataIndex: 'inf3',
                    width: 95,
                    field: {
                    }
                },
                {
                    header: 'Action',
                    xtype: 'actioncolumn',
                    width: 30,
                    items:[ {
                        icon: '/ext4/examples/shared/icons/fam/delete.gif', // Use a URL in the icon config
                        tooltip: 'Удалить',
                        handler: function (grid, rowIndex, colIndex) {
                            sertificates.removeAt(rowIndex);
                        }
                    }]
                }],
                selModel: {
                    selType: 'cellmodel'
                },
                tbar:[ {
                    text: 'Новый сертификат',
                    handler: function () {
                        // Create a record instance through the ModelManager
                        var r = Ext.ModelManager.create({
                            idd: sertificates.max('idd') + 1,
                            serial: '',
                            num: '',
                            date: '',
                            cultura: '',
                            sort: '',
                            vmist: '',
                            shogest: '',
                            energy: '',
                            masa1000: '',
                            inf1: '',
                            inf2: '',
                            inf3: ''
                        },
                        'Sertificate');
                        sertificates.insert(0, r);
                    }
                },
                {
                    text: 'Сохранить',
                    handler: function () {
                        sertificates.sync();
                        selSertificates.load();
                        renSertificates.load();
                    }
                }],
                plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
                ////////////   END Sertificates !!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }, {
                ////////////   START Svitoctvos !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                title: 'Свиделельства',
                xtype: 'grid',
                layout: 'fit',
                store: svidoctos,
                columns:[ {
                    id: 'svidoctvo_id',
                    header: '№п/п',
                    width: 30,
                    dataIndex: 'idd',
                    field: {
                        allowBlank: false
                    }
                }, {
                    header: 'Клиент',
                    width: 200,
                    dataIndex: 'client',
                    field: {
                        allowBlank: false,
                        xtype: 'combobox',
                        typeAhead: true,
                        triggerAction: 'all',
                        store: selClients,
                        displayField: 'common',
                        valueField: 'common',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                }, {
                    header: 'Сертификат',
                    width: 300,
                    dataIndex: 'sertificate',
                    renderer: function (val) {
                        if (! val) return '';
                        var n = renSertificates.findExact('idd', val);
                        if (n < 0) return '';
                        var rec = renSertificates.getAt(n);
                        return rec.data.desc;
                    },
                    field: {
                        allowBlank: false,
                        xtype: 'combobox',
                        typeAhead: true,
                        triggerAction: 'all',
                        store: selSertificates,
                        displayField: 'desc',
                        valueField: 'idd',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                }, {
                    header: 'Масса',
                    dataIndex: 'masa',
                    align: 'right',
                    width: 50,
                    field: {
                        allowBlank: false
                    }
                }, {
                    header: 'Action',
                    xtype: 'actioncolumn',
                    width: 40,
                    items:[ {
                        icon: '/ext4/examples/shared/icons/fam/delete.gif', // Use a URL in the icon config
                        tooltip: 'Удалить',
                        handler: function (grid, rowIndex, colIndex) {
                            svidoctos.removeAt(rowIndex);
                        }
                    }, {
                        icon: '/ext4/examples/shared/icons/fam/application_go.png', // Use a URL in the icon config
                        tooltip: 'doc',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = svidoctos.getAt(rowIndex).data;
                            //                            
                            var url = "svidoctvo_doc.php?client=" + rec.client + "&sertificate=" + rec.sertificate + "&masa=" + rec.masa + "&idd=" + rec.idd;
//                            var url = "/svidoctvo_doc.php?client=&sertificate=&massa=";
                            window.open(url);
                        }
                    }]
                }],//window.open('http://www.pageresource.com/jscript/jex5.htm',
                selModel: {
                    selType: 'cellmodel'
                },
                //        renderTo: 'svidoctvos-grid',
                tbar:[ {
                    text: 'Новое свидетельство',
                    handler: function () {
                        // Create a record instance through the ModelManager
                        var r = Ext.ModelManager.create({
                            idd: Math.max(atestats.max('idd'),svidoctos.max('idd')) + 1,
                            client: '',
                            sertificate: '',
                            masa: '',
                        },
                        'Svidoctvo');
                        svidoctos.insert(0, r);
                    }
                }, {
                    text: 'Сохранить',
                    handler: function () {
                        svidoctos.sync();
                        selSertificates.load();
                        renSertificates.load();
                    }
                }],
                plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
                
                ////////////   END Svitoctvos !!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }, {
                ////////////   START Atestats !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                title: 'Атестаты',
                xtype: 'grid',
                layout: 'fit',
                store: atestats,
                columns:[ {
                    id: 'atestat_id',
                    header: '№п/п',
                    width: 30,
                    dataIndex: 'idd',
                    field: {
                        allowBlank: false
                    }
                }, {
                    header: 'Клиент',
                    width: 200,
                    dataIndex: 'client',
                    field: {
                        allowBlank: false,
                        xtype: 'combobox',
                        typeAhead: true,
                        triggerAction: 'all',
                        store: selClients,
                        displayField: 'common',
                        valueField: 'common',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                }, {
                    header: 'Сертификат',
                    width: 300,
                    dataIndex: 'sertificate',
                    renderer: function (val) {
                        if (! val) return '';
                        var n = renSertificates.findExact('idd', val);
                        if (n < 0) return '';
                        var rec = renSertificates.getAt(n);
                        return rec.data.desc;
                    },
                    field: {
                        allowBlank: false,
                        xtype: 'combobox',
                        typeAhead: true,
                        triggerAction: 'all',
                        store: selSertificates,
                        displayField: 'desc',
                        valueField: 'idd',
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                }, {
                    header: 'Масса',
                    dataIndex: 'masa',
                    align: 'right',
                    width: 50,
                    field: {
                        allowBlank: false
                    }
                }, {
                    header: 'Action',
                    xtype: 'actioncolumn',
                    width: 40,
                    items:[ {
                        icon: '/ext4/examples/shared/icons/fam/delete.gif', // Use a URL in the icon config
                        tooltip: 'Удалить',
                        handler: function (grid, rowIndex, colIndex) {
                            atestats.removeAt(rowIndex);
                        }
                    }, {
                        icon: '/ext4/examples/shared/icons/fam/application_go.png', // Use a URL in the icon config
                        tooltip: 'doc',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = atestats.getAt(rowIndex).data;
                            //                            
                            var url = "atestat_doc.php?client=" + rec.client + "&sertificate=" + rec.sertificate + "&masa=" + rec.masa + "&idd=" + rec.idd;
//                            var url = "/svidoctvo_doc.php?client=&sertificate=&massa=";
                            window.open(url);
                        }
                    }]
                }],//window.open('http://www.pageresource.com/jscript/jex5.htm',
                selModel: {
                    selType: 'cellmodel'
                },
                //        renderTo: 'svidoctvos-grid',
                tbar:[ {
                    text: 'Новый атестат',
                    handler: function () {
                        // Create a record instance through the ModelManager
                        var r = Ext.ModelManager.create({
                            idd: Math.max(atestats.max('idd'),svidoctos.max('idd')) + 1,
                            client: '',
                            sertificate: '',
                            masa: '',
                        },
                        'Svidoctvo');
                        atestats.insert(0, r);
                    }
                }, {
                    text: 'Сохранить',
                    handler: function () {
                        atestats.sync();
                        selSertificates.load();
                        renSertificates.load();
                    }
                }],
                plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
                
                ////////////   END Atestats !!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }]
            ///////////////  END Tabs
        }]
    });
});
