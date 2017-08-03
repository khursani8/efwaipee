'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('thesis', {
      url: '/thesis',
      template: '<thesis></thesis>',
      onEnter:function () {
                   setTimeout(()=>{
                        console.log( "window loaded dlm onenter" );
                        $('.tooltipped').tooltip({delay: 50});
                        $('select').material_select();
                        $('.modal').modal();
                   },1000)

                }
    })
    .state('thesis.details',{
      url:'/:id',
      template: '<details open></details>'
    }
  )
    ;
}
