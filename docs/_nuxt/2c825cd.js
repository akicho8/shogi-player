(window.webpackJsonp=window.webpackJsonp||[]).push([[22,6,75,84],{269:function(e,t,o){"use strict";o.r(t),o.d(t,"edit_mode_module",(function(){return j}));o(29),o(21),o(28),o(37),o(38);var r=o(485),n=o(11),_=(o(89),o(15),o(36),o(70),o(71),o(14)),c=o.n(_),l=o(519),h=o(132),d=(o(133),o(505)),f=o(484),m=o(69),v=(o(507),o(520)),y=o(521);function k(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function O(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var j={props:{sp_play_mode_legal_move_only:{type:Boolean,default:!0},sp_play_mode_legal_jump_only:{type:Boolean,default:!0},sp_play_mode_legal_pawn_drop:{type:Boolean,default:!0},sp_play_mode_auto_promote:{type:Boolean,default:!0},sp_play_mode_not_put_if_death_soldier:{type:Boolean,default:!0},sp_play_mode_only_own_piece_to_move:{type:Boolean,default:!0},sp_play_mode_can_not_kill_same_team_soldier:{type:Boolean,default:!0},sp_edit_mode_double_click_time_ms:{type:Number,default:350},sp_play_effect_type:{type:String,default:null},sp_move_cancel:{type:String,default:"is_move_cancel_standard"},sp_view_mode_soldier_movable:{type:Boolean,default:!0}},data:function(){return{place_from:null,have_piece:null,have_piece_location:null,have_piece_promoted:null,me_running_p:!1,_me_last_event:null,_CursorObject:null,mouse_stick:!1,dialog_soldier:null,_last_clicked_cell:null,_double_tap_time:null,last_move_info:null,killed_soldier:null}},watch:{new_run_mode:function(){this.state_reset()}},beforeDestroy:function(){this.virtual_piece_destroy()},methods:{board_cell_pointerdown_handle:function(e,t){var o=this.sp_board_cell_pointerdown_user_handle;!o||o(h.Place.fetch(e),t)},board_cell_left_click:function(e,t){var o=this;this.log("board_cell_left_click"),this.log("shiftKey: ".concat(t.shiftKey)),this.$data._last_clicked_cell=t.target;var r=h.Place.fetch(e),n=this.sp_board_cell_left_click_user_handle;if(!(n&&(this.log("ユーザー指定のクリックハンドル実行: ".concat(r.css_place_key)),n(r,t))||this.break_if_view_mode)){this.killed_soldier=this.mediator.board.lookup(r);var _=null,l=null;if(this.origin_soldier1&&(l=(_=new f.Soldier({piece:this.origin_soldier1.piece,place:r,promoted:this.origin_soldier1.promoted,location:this.origin_soldier1.location})).promotable_p||this.origin_soldier1.promotable_p),this.cpu_location_p)return this.log("片方の手番だけを操作できるようにする sp_human_side の指定があってCPU側なので無効とする"),void this.$emit("operation_invalid1");if(this.sp_play_mode_only_own_piece_to_move&&this.play_p&&!this.lifted_p&&this.killed_soldier&&this.killed_soldier.location!==this.mediator.current_location)return this.log("自分の手番で相手の駒を持ち上げようとしたので無効とする"),void this.$emit("operation_invalid2");if(this.play_p&&this.have_piece&&this.killed_soldier)return this.log("駒台や駒箱から持ち上げた駒を盤上の駒の上に置こうとしたので無効とする"),void this.if_standard_then_unhold();if(this.sp_play_mode_not_put_if_death_soldier&&this.play_p&&this.have_piece&&!this.killed_soldier){var v=this.soldier_create_from_stand_or_box_on(r),y=v.piece.piece_vector.force_promote_length;if(null!=y&&v.top_spaces<=y)return void this.log("駒台や駒箱から持ち上げた駒を置こうとしたけど死に駒なので無効とする")}if(this.lifted_p||this.killed_soldier){if(this.play_p&&this.sp_play_mode_can_not_kill_same_team_soldier&&this.put_on_my_soldier_p(this.killed_soldier))return this.log("自分の駒の上に駒を重ねようとしたので無効とする(盤上の移動元の駒を含まない)"),"is_move_cancel_rehold"===this.move_cancel_info.key?(this.log("盤上の駒を持って別の盤上の駒に持ち直した"),void this.soldier_hold(r,t)):void this.if_standard_then_unhold();if(this.edit_p){var k=this.$data._double_tap_time;if(this.$data._double_tap_time=Date.now(),this.killed_soldier&&c.a.isEqual(this.place_from,r)&&k){var O=this.$data._double_tap_time-k,j=O<this.sp_edit_mode_double_click_time_ms;if(this.log("ダブルクリック判定: (".concat(O," ms < ").concat(this.sp_edit_mode_double_click_time_ms,") -> ").concat(j)),j)return this.log("操作モードで盤上の駒を持って同じ位置に戻したときに盤上の駒を裏返す"),this.mediator.board.place_on(this.killed_soldier.transform_clone),void this.piece_hold_and_put_for_bug(r,t)}}if(c.a.isEqual(this.place_from,r))return this.log("盤上の駒を持って同じ位置に戻したので状況キャンセル"),void this.state_reset();if(this.edit_p&&(this.log("lifted_from_p: ".concat(this.lifted_p)),this.meta_p(t)&&!this.lifted_p&&this.killed_soldier))return this.log("盤上の駒を裏返す"),this.mediator.board.place_on(this.killed_soldier.transform_clone),void this.piece_hold_and_put_for_bug(r,t);if(!this.lifted_p)return this.log("盤上の駒を持ちあげる"),void this.soldier_hold(r,t);if(this.sp_play_mode_legal_move_only&&this.play_p&&this.place_from){var w=d.PieceVector.fetch(this.origin_soldier1.piece.key),x=this.place_from.x,P=this.place_from.y,E=null,$=!1;if(!$){E=this.origin_soldier1.promoted?w.promoted_once_vectors:w.basic_once_vectors;var C=d.PieceVector[E];C&&($=C.some((function(e){if(e){var t=e[0],n=e[1]*o.origin_soldier1.location.value_sign,_=P+n;return x+t===r.x&&_===r.y}})))}if(!$){E=this.origin_soldier1.promoted?w.promoted_repeat_vectors:w.basic_repeat_vectors;var I=d.PieceVector[E];I&&($=I.some((function(e){if(e)for(var t=e[0],n=e[1]*o.origin_soldier1.location.value_sign,_=x+t,c=P+n;h.Place.xy_valid_p(_,c);){if(_===r.x&&c===r.y)return!0;var l=h.Place.fetch([_,c]);if(o.mediator.board.lookup(l)&&o.sp_play_mode_legal_jump_only)break;_+=t,c+=n}})))}if(!$)return this.log("操作モードで盤上の駒を動かし中だが動けないセルをタップしたので無効"),void this.if_standard_then_unhold()}if(!this.place_from){if(this.have_piece){if(this.log("持駒を置く"),this.sp_play_mode_legal_pawn_drop&&this.play_p&&"P"===this.have_piece.key&&this.have_piece_location&&this.mediator.board.piece_exist_by_x(r.x,this.have_piece_location,this.have_piece))return this.log("二歩"),void this.$emit("operation_double_pawn");this.killed_soldier&&(this.have_piece_location?this.mediator.hold_pieces_add(this.have_piece_location,this.killed_soldier.piece):this.mediator.hold_pieces_add(m.Location.fetch("black"),this.killed_soldier.piece));var R=this.soldier_create_from_stand_or_box_on(r);return this.piece_decriment(),this.mediator.board.place_on(R),this.move_info_create({type:"put",to:R}),this.moves_set(),this.state_reset(),void this.turn_next()}throw new Error("must not happen")}if(this.log("盤上から移動"),this.killed_soldier&&this.mediator.hold_pieces_add(this.origin_soldier1.location,this.killed_soldier.piece),(this.view_p||this.play_p)&&l){var N=!0;if(this.sp_play_mode_auto_promote){var S=_.piece.piece_vector.force_promote_length;null!=S&&_.top_spaces<=S&&(this.promotable_piece_moved(_,!0),N=!1)}N&&(this.mouse_stick=!1,this.dialog_soldier=_,this.virtual_piece_destroy())}else this.play_p&&(this.move_info_create({type:"move",from:this.origin_soldier1,to:_,killed_soldier:this.killed_soldier}),this.moves_set()),this.mediator.board.place_on(_),this.mediator.board.delete_at(this.place_from),this.state_reset(),this.turn_next()}else this.log("持たずに何もないところをクリックしたので無効とする")}},promotable_piece_moved2:function(e){this.promotable_piece_moved(this.dialog_soldier,e)},promotable_piece_moved:function(e,t){e=e.clone_with_attrs({promoted:t}),this.move_info_create({type:"promotable",from:this.origin_soldier1,to:e}),this.moves_set(),this.mediator.board.place_on(e),this.mediator.board.delete_at(this.place_from),this.state_reset(),this.turn_next()},move_info_create:function(e){this.last_move_info=new l.MoveInfo(O(O({},e),{},{next_turn_offset:this.turn_offset+1,player_location:this.mediator.current_location,killed_soldier:this.killed_soldier}))},board_cell_right_click:function(e,t){if(this.log("盤のセルを右クリック"),!this.break_if_view_mode){var o=h.Place.fetch(e),r=this.mediator.board.lookup(o);this.hold_cancel(t)||this.edit_p&&!this.lifted_p&&r&&(this.log("盤上の駒を裏返す"),this.mediator.board.place_on(r.transform_clone),this.piece_hold_and_put_for_bug(o,t))}},membership_click_handle:function(e,t){if(!this.break_if_view_mode)return this.have_piece&&this.have_piece_location===e?(this.log("自分の駒台から駒を持ち上げているならキャンセル"),this.state_reset(),!0):this.edit_p&&this.have_piece?(this.hold_pieces_move_to_my_hold_pieces(t,e),!0):this.play_p&&this.origin_soldier1?(this.log("play_mode では盤上の駒を駒台に置くことはできない"),this.if_standard_then_unhold(),!0):!!this.origin_soldier1&&(this.log("盤上の駒を駒台に置く"),this.board_soldir_to_hold_pieces(e),!0)},piece_stand_piece_click:function(e,t,o,r){if(this.log("駒台の駒をクリック"),!this.break_if_view_mode)if(this.mediator.hold_pieces_count(e,t)<=0)this.log("クリックしたけど持駒がない");else if(this.sp_play_mode_only_own_piece_to_move&&this.play_p&&e!==this.mediator.current_location)this.log("相手の持駒を持とうとしたときは無効");else{if(this.cpu_location_p)return this.log("片方の手番だけを操作できるようにする sp_human_side の指定があってCPU側なので無効とする"),void this.$emit("operation_invalid1");this.log("駒台の駒を持つ"),this.have_piece=t,this.have_piece_location=e,this.have_piece_promoted=o,this.virtual_piece_create(r,this.origin_soldier2)}},piece_box_have_p:function(e){return c.a.isNil(this.have_piece_location)&&this.have_piece===e},piece_box_other_click:function(e){if(this.log("piece_box_other_click:駒箱クリック"),c.a.isNil(this.have_piece_location)&&this.have_piece)return this.log("持っているならキャンセル"),this.state_reset(),!0;if(this.have_piece_location&&this.have_piece){this.log("駒台から駒箱に移動");var t=this.hold_piece_source_cut(e);return this.mediator.piece_box_add(this.have_piece,t),this.state_reset(),!0}return!!this.origin_soldier1&&(this.log("盤上の駒を駒箱に移動"),this.mediator.piece_box_add(this.origin_soldier1.piece),this.mediator.board.delete_at(this.origin_soldier1.place),this.state_reset(),!0)},piece_box_piece_click:function(e,t){this.piece_box_other_click(t)||(this.log("piece_box_piece_click:駒箱の駒を持つ"),this.have_piece=e,this.have_piece_location=null,this.have_piece_promoted=!1,this.virtual_piece_create(t,this.origin_soldier2))},hold_cancel:function(e){return!(this.dialog_soldier||!this.lifted_p)&&(this.log("持ち上げた駒を元に戻す"),this.state_reset(),!0)},board_soldir_to_hold_pieces:function(e){this.mediator.hold_pieces_add(e,this.origin_soldier1.piece),this.mediator.board.delete_at(this.origin_soldier1.place),this.state_reset()},hold_pieces_move_to_my_hold_pieces:function(e,t){this.log("相手の持駒を自分の駒台に移動");var o=this.hold_piece_source_cut(e);this.mediator.hold_pieces_add(t,this.have_piece,o),this.state_reset()},hold_piece_source_cut:function(e){var t=1;return this.have_piece_location?(this.log("相手の駒箱から移動"),this.meta_p(e)&&(this.log("シフトが押されていたので全部移動"),t=this.mediator.hold_pieces_count(this.have_piece_location,this.have_piece)),t=this.mediator.hold_pieces_can_be_reduced_count(this.have_piece_location,this.have_piece,t),this.mediator.hold_pieces_add(this.have_piece_location,this.have_piece,-t)):(this.log("駒箱から移動"),this.meta_p(e)&&(this.log("シフトが押されていたので全部移動"),t=this.mediator.piece_box_count(this.have_piece)),t=this.mediator.piece_box_can_be_reduced_count(this.have_piece,t),this.mediator.piece_box_add(this.have_piece,-t)),t},piece_decriment:function(){this.have_piece_location?this.mediator.hold_pieces_add(this.have_piece_location,this.have_piece,-1):this.mediator.piece_box_add(this.have_piece,-1)},put_on_my_soldier_p:function(e){if(this.lifted_p&&e&&e.location===this.mediator.current_location&&!c.a.isEqual(this.place_from,e.place))return!0},soldier_hold:function(e,t){this.place_from=e,this.virtual_piece_create(t,this.origin_soldier1)},state_reset:function(){this.log("state_reset"),this.dialog_soldier=null,this.place_from=null,this.have_piece=null,this.have_piece_location=null,this.have_piece_promoted=null,this.killed_soldier=null,this.virtual_piece_destroy()},if_standard_then_unhold:function(){this.move_cancel_info.smooth_cancel&&(this.log("持った状態で自分の非合法セルタップでキャンセル"),this.state_reset())},piece_hold_and_put_for_bug:function(e,t){this.state_reset()},fn_flip_all:function(){var e=this;this.mediator.board=this.mediator.board.flip_all,this.mediator.hold_pieces=c.a.reduce(m.Location.values,(function(a,t){return a[t.key]=e.mediator.hold_pieces[t.flip.key],a}),{})},fn_flop:function(){this.mediator.board=this.mediator.board.flop},init_location_toggle:function(){this.init_location_key=this.init_location.flip.key},soldier_create_from_stand_or_box_on:function(e){return new f.Soldier({piece:this.have_piece,place:e,promoted:this.have_piece_promoted||!1,location:this.have_piece_location||m.Location.fetch("black")})},mousemove_hook:function(e){var t=this;this.$data._me_last_event=e,this.me_running_p||(this.me_running_p=!0,window.requestAnimationFrame((function(){t.cursor_object_xy_update(),t.me_running_p=!1})))},click_hook:function(e){1!==e.which&&this.state_reset()},cursor_object_xy_update:function(){if(this.$data._CursorObject&&this.$data._me_last_event&&this.mouse_stick){var e=this.$data._me_last_event.clientX,t=this.$data._me_last_event.clientY;this.element_vector_set(this.$data._CursorObject,{x:e,y:t})}},virtual_piece_create:function(e,t){this.virtual_piece_destroy(),this.virtual_piece_dom_create(t),this.mouse_stick=!0,e&&(this.$data._me_last_event=e,this.cursor_object_xy_update()),this.$el.addEventListener("mousemove",this.mousemove_hook),this.$el.addEventListener("click",this.click_hook)},virtual_piece_dom_create:function(e){this.$data._CursorObject=this.el_create(["CursorObject"]);var t=this.el_create(["PieceTap"]),o=this.el_create(["PieceTexture"]),n=this.el_create(["PieceTextureSelf"].concat(Object(r.a)(e.css_class_list)));t.classList.add(e.location.flip_if(this.base.fliped).position_key),o.appendChild(n),t.appendChild(o),this.$data._CursorObject.appendChild(t);var _=e.location.flip_if(this.fliped).position_key,c=y.PositionInfo.fetch(_);if(e.place){var l=this.place_to_cell_info(e.place),h=this.vector_scale(l.radius,this.devise_info.gap*c.sign*-1),d=this.vector_add(l.center,h);this.element_vector_set(this.$data._CursorObject,d)}else this.$data._CursorObject.style.left="-50%",this.$data._CursorObject.style.top="-50%";this.$refs.ShogiPlayerGround.$el.appendChild(this.$data._CursorObject)},el_create:function(e){var t,o=document.createElement("div");return(t=o.classList).add.apply(t,Object(r.a)(e)),o},virtual_piece_destroy:function(){this.$data._CursorObject&&(this.$refs.ShogiPlayerGround.$el.removeChild(this.$data._CursorObject),this.$data._CursorObject=null,this.mouse_stick=!1,this.$el.removeEventListener("mousemove",this.mousemove_hook),this.$el.removeEventListener("click",this.click_hook))},meta_p:function(e){return e.shiftKey|e.ctrlKey|e.altKey|e.metaKey}},computed:{MoveCancelInfo:function(){return v.MoveCancelInfo},move_cancel_info:function(){return this.MoveCancelInfo.fetch(this.sp_move_cancel)},origin_soldier1:function(){if(this.place_from)return this.mediator.board.lookup(this.place_from)},origin_soldier2:function(){if(this.have_piece){return this.soldier_create_from_stand_or_box_on(null)}},soldier_or_stand_p:function(){return this.place_from||this.have_piece_location},lifted_p:function(){return!c.a.isNil(this.place_from)||!c.a.isNil(this.have_piece)},cpu_location_p:function(){if(this.play_p)return!c.a.includes(this.human_locations,this.mediator.current_location)},break_if_view_mode:function(){if(this.view_p&&!this.sp_view_mode_soldier_movable)return!0}}}},485:function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));var r=o(92);var n=o(134),_=o(72);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(n.a)(e)||Object(_.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},507:function(e,t,o){"use strict";o.r(t),o.d(t,"EffectInfo",(function(){return x}));o(29),o(21),o(28),o(37),o(38),o(479);var r=o(480),n=o(481),_=o(478),c=o(485),l=o(11),h=o(129),d=o(130),f=o(482),m=o.n(f),v=o(513);function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,r=Object(_.a)(e);if(t){var c=Object(_.a)(this).constructor;o=Reflect.construct(r,arguments,c)}else o=r.apply(this,arguments);return Object(n.a)(this,o)}}function k(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function O(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(t){Object(l.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var j=function(){function e(base,t){Object(h.a)(this,e),this.base=base,this.params=O({},t)}return Object(d.a)(e,[{key:"run",value:function(){var e=this;this.current=document.createElement("div"),this.current.classList.add("fireball",this.params.css_class),this.current.style.transitionDuration="".concat(this.params.duration,"ms"),this.base.body_el.appendChild(this.current);var t=this.base.from_rc,o=t.left+t.width/2,r=t.top+t.height/2,n=this.current.getBoundingClientRect(),_=o-n.width/2,c=r-n.height/2;this.current.style.position="absolute",this.current.style.left="".concat(_,"px"),this.current.style.top="".concat(c,"px");var a=2*Math.PI*this.params.angle,l=Math.cos(a)*this.params.radius,h=Math.sin(a)*this.params.radius;this.current.style.transform="translate(".concat(l,"px, ").concat(h,"px)"),setTimeout((function(){return e.current_destroy()}),this.params.duration+this.params.destroy_gap)}},{key:"current_destroy",value:function(){this.base.body_el.removeChild(this.current)}}],[{key:"run",value:function(base){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},object=new this(base,e);object.run()}}]),e}(),w=function(e){Object(r.a)(o,e);var t=y(o);function o(){return Object(h.a)(this,o),t.apply(this,arguments)}return Object(d.a)(o,[{key:"run",value:function(){var e=this;this.effect_info.params_list.forEach((function(t){e.circle_create(t)}))}}]),o}(function(){function e(t,o){Object(h.a)(this,e),this.effect_info=t,this.params=o}return Object(d.a)(e,[{key:"run_around",value:function(){this.before_run(),this.run()}},{key:"before_run",value:function(){var e=this.params.from_el||document.querySelector(this.params.from_selector);this.from_rc=e.getBoundingClientRect(),this.body_el=document.querySelector("body")}},{key:"circle_create",value:function(e){e=O(O({},this.params),e);for(var t=v.Random.rand(),o=0;o<e.total;o++){var r=O({},e);r.radius_range&&(r.radius=v.Random.range.apply(v.Random,Object(c.a)(r.radius_range))),r.duration_range&&(r.duration=v.Random.range.apply(v.Random,Object(c.a)(r.duration_range))),r.destroy_gap_range&&(r.destroy_gap=v.Random.range.apply(v.Random,Object(c.a)(r.destroy_gap_range))),r.angle_rand?r.angle=v.Random.rand():r.angle=t+1/e.total*o,this.fireball_create(r)}}},{key:"fireball_create",value:function(e){j.run(this,e)}}],[{key:"run",value:function(e,t){new this(e,t).run_around()}}]),e}()),x=function(e){Object(r.a)(o,e);var t=y(o);function o(){return Object(h.a)(this,o),t.apply(this,arguments)}return Object(d.a)(o,[{key:"run",value:function(e){this.factory.run(this,e)}}],[{key:"define",get:function(){return[{key:"fw_type_1",factory:w,params_list:[{total:16,angle_rand:!1,radius:null,radius_range:[32,512],duration:null,duration_range:[300,600],destroy_gap:null,destroy_gap_range:[-100,100],css_class:"fireball_s1"},{total:16,angle_rand:!1,radius:200,radius_range:null,duration:300,duration_range:null,destroy_gap:0,destroy_gap_range:null,css_class:"fireball_s1"}]},{key:"fw_type_2",factory:w,params_list:[{total:16,angle_rand:!1,radius:200,radius_range:null,duration:300,duration_range:null,destroy_gap:0,destroy_gap_range:null,css_class:"fireball_s1"}]},{key:"fw_type_3",factory:w,params_list:[{total:12,angle_rand:!1,radius:128,radius_range:null,duration:750,duration_range:null,destroy_gap:0,destroy_gap_range:null,css_class:"fireball_s1"}]}]}}]),o}(m.a)},508:function(e,t,o){var r=o(7);r(r.S,"Math",{trunc:function(e){return(e>0?Math.floor:Math.ceil)(e)}})},513:function(e,t,o){"use strict";o.r(t),o.d(t,"Random",(function(){return r}));var r={rand:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Math.random()*e},range:function(a,b){return this.rand(b-a)+a},int_range_include:function(a,b){return this.rand(b-a+1)+a}}},519:function(e,t,o){"use strict";o.r(t),function(e,r){o.d(t,"MoveInfo",(function(){return d}));o(29),o(21),o(28),o(37),o(38);var n=o(11),_=o(129),c=o(130);o(27);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d=function(){function e(t){Object(_.a)(this,e),Object.assign(this,t)}return Object(c.a)(e,[{key:"to_sfen",get:function(){var e=null;if("move"===this.type)e=this.from.place.to_sfen+this.to.place.to_sfen;else if("promotable"===this.type)e=this.from.place.to_sfen+this.to.place.to_sfen+(this.to.promoted?"+":"");else{if("put"!==this.type)throw new Error("must not happen");e=this.to.piece.key+"*"+this.to.place.to_sfen}return e}},{key:"to_kif",get:function(){return this.to_custom_kif()}},{key:"to_kif_without_from",get:function(){return this.to_custom_kif({from:!1})}},{key:"to_yomiage",get:function(){var e=null;if("move"===this.type)e=this.from.yomiage_name;else if("promotable"===this.type)e=this.from.piece.piece_yomiage.prefix_name+"、"+(this.to.promoted?"なりっ！":"ならずっ！");else{if("put"!==this.type)throw new Error("must not happen");e=this.to.piece.piece_yomiage.prefix_name+"、うつ！"}return[this.to.place.yomiage_x,this.to.place.yomiage_y,e].join(" ")}},{key:"effect_key",get:function(){if(this.killed_soldier)return"kill_attack";if("move"===this.type)return"move_or_appear";if("promotable"===this.type)return this.to.promoted,"move_or_appear";if("put"===this.type)return"move_or_appear";throw new Error("must not happen")}},{key:"to_custom_kif",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e=h({location:!0,from:!0},e);var t=null,o="";if("move"===this.type)t=this.from.name,e.from&&(o=this.__from_xy);else if("promotable"===this.type)t=this.from.name+(this.to.promoted?"成":"不成"),e.from&&(o=this.__from_xy);else{if("put"!==this.type)throw new Error("must not happen");t=this.to.name+"打"}return[e.location?this.to.location.name:"",this.__to_xy,t,o].join("")}},{key:"__from_xy",get:function(){return["(",this.from.place.digit_human,")"].join("")}},{key:"__to_xy",get:function(){return[this.to.place.human_x,this.to.place.kanji_human_y].join("")}}]),e}();e.argv[1]}.call(this,o(131),"/index.js")},520:function(e,t,o){"use strict";o.r(t),o.d(t,"MoveCancelInfo",(function(){return f}));o(479);var r=o(129),n=o(130),_=o(480),c=o(481),l=o(478),h=o(482);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,r=Object(l.a)(e);if(t){var n=Object(l.a)(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return Object(c.a)(this,o)}}var f=function(e){Object(_.a)(o,e);var t=d(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(n.a)(o,null,[{key:"define",get:function(){return[{key:"is_move_cancel_standard",name:"無効な場所をタップで駒を離す",smooth_cancel:!0},{key:"is_move_cancel_reality",name:"移動元をタップしたときに駒を離す",smooth_cancel:!1},{key:"is_move_cancel_rehold",name:"移動元をタップしたときに駒を離して持つ",smooth_cancel:!0}]}}]),o}(o.n(h).a)},521:function(e,t,o){"use strict";o.r(t),o.d(t,"PositionInfo",(function(){return f}));o(479);var r=o(129),n=o(130),_=o(480),c=o(481),l=o(478),h=o(482);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,r=Object(l.a)(e);if(t){var n=Object(l.a)(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return Object(c.a)(this,o)}}var f=function(e){Object(_.a)(o,e);var t=d(o);function o(){return Object(r.a)(this,o),t.apply(this,arguments)}return Object(n.a)(o,null,[{key:"define",get:function(){return[{key:"is_position_north",name:"北",sign:-1},{key:"is_position_south",name:"南",sign:1}]}}]),o}(o.n(h).a)},561:function(e,t,o){var r=o(7),n=o(46),_=o(16),c=o(562),l="["+c+"]",h=RegExp("^"+l+l+"*"),d=RegExp(l+l+"*$"),f=function(e,t,o){var n={},l=_((function(){return!!c[e]()||"​"!="​"[e]()})),h=n[e]=l?t(m):c[e];o&&(n[o]=h),r(r.P+r.F*l,"String",n)},m=f.trim=function(e,t){return e=String(n(e)),1&t&&(e=e.replace(h,"")),2&t&&(e=e.replace(d,"")),e};e.exports=f},562:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},89:function(e,t,o){"use strict";var r=o(9),n=o(39),_=o(40),c=o(280),l=o(93),h=o(16),d=o(75).f,f=o(76).f,m=o(20).f,v=o(561).trim,y="Number",k=r.Number,O=k,j=k.prototype,w=_(o(136)(j))==y,x="trim"in String.prototype,P=function(e){var t=l(e,!1);if("string"==typeof t&&t.length>2){var o,r,n,_=(t=x?t.trim():v(t,3)).charCodeAt(0);if(43===_||45===_){if(88===(o=t.charCodeAt(2))||120===o)return NaN}else if(48===_){switch(t.charCodeAt(1)){case 66:case 98:r=2,n=49;break;case 79:case 111:r=8,n=55;break;default:return+t}for(var code,c=t.slice(2),i=0,h=c.length;i<h;i++)if((code=c.charCodeAt(i))<48||code>n)return NaN;return parseInt(c,r)}}return+t};if(!k(" 0o1")||!k("0b1")||k("+0x1")){k=function(e){var t=arguments.length<1?0:e,o=this;return o instanceof k&&(w?h((function(){j.valueOf.call(o)})):_(o)!=y)?c(new O(P(t)),o,k):P(t)};for(var E,$=o(12)?d(O):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;$.length>C;C++)n(O,E=$[C])&&!n(k,E)&&m(k,E,f(O,E));k.prototype=j,j.constructor=k,o(22)(r,y,k)}}}]);