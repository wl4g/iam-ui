export default {
    name:"identityProviders",
    data(){
        return{
            searchParams: {
                key: '',
            },
            total:'',
            tableData:[],
            options: [{
                label: 'User-defind',
                options: [{
                  value: 'Shanghai',
                  label: 'SAML v2.0'
                }, {
                  value: 'Beijing',
                  label: 'OpenId Connect v1.0'
                }]
              }, {
                label: 'Social',
                options: [{
                  value: 'Chengdu',
                  label: 'Facebook'
                }, {
                  value: 'Shenzhen',
                  label: 'Google'
                }, {
                  value: 'Guangzhou',
                  label: 'LinkedIn'
                }, {
                  value: 'Dalian',
                  label: 'Instagram'
                }]
              }],
              value: ''
        }
    }
}