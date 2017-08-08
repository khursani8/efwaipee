'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('thesis', {
      url: '/thesis',
      template: '<thesis></thesis>',
      onEnter:function () {
                var timer = setInterval(DoSomething);
                function DoSomething() {
                    var a = $('select')[0]
                    if (a){
                        a.classList.contains('initialized')
                        clearInterval(timer)
                    }
                    console.log( "window loaded dlm onenter" );
                    $('.tooltipped').tooltip({delay: 50});
                    $('select').material_select();
                    $('.modal').modal();
                }
              }
    })
    .state('thesis.details',{
      url:'/:id',
      template: '<details open></details>'
    }
  )
    ;
}
