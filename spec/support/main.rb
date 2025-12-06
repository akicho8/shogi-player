module SpSystemTestMethods
  def session_options_hash
    Capybara::SessionConfig::OPTIONS.inject({}) { |a, e| a.merge(a.merge(e => Capybara.session_options.send(e))) }
  end

  def visit_to(url, params = {})
    params = {
      :__SYSTEM_TEST_RUNNING__ => true,
    }.merge(params).stringify_keys
    uri = URI(url)                                        # => #<URI::HTTPS https://example.com/?a=1&b=2>
    original_params = Rack::Utils.parse_query(uri.query)  # => {"a"=>"1", "b"=>"2"}
    params = original_params.merge(params)                # => {"a"=>"1", "b"=>"2", "c"=>3}
    uri.query = params.to_query                           # => "a=1&b=2&c=3"
    puts "[visit_to] #{uri}"
    visit(uri.to_s)
    # browser_audio_wakeup
  end

  # 将棋盤内でプレイヤー名が表示されている
  def assert_has_sp_player_name
    assert_selector(".MembershipLocationPlayerInfoName")
  end

  # 将棋盤内で location_key 側のプレイヤー名は user_name になっている
  def assert_sp_player_name(location_key, user_name)
    assert_selector(".ShogiPlayer .Membership.is_#{location_key} .MembershipLocationPlayerInfoName", text: user_name, exact_text: true)
  end

  # ▲△の順に指定のプレイヤー名を表示している
  def assert_sp_player_names(black_name, white_name)
    assert_sp_player_name(:black, black_name)
    assert_sp_player_name(:white, white_name)
  end

  def sp_controller_click(klass)
    find(".ShogiPlayer .NavigateBlock .button.#{klass}").click
  end

  # 向き
  def assert_viewpoint(location_key)
    assert_selector(".ShogiPlayer.is_viewpoint_#{location_key}")
  end

  # from から to に移動する
  def piece_move(from, to)
    [from, to].each { |e| place_click(e) }
  end

  # place_click("76") は find(".place_7_6").click 相当
  def place_click(place)
    find(place_class(place)).click
  end

  def place_class(place)
    [".place", place.chars].join("_")
  end

  # 持駒を持つ
  def stand_click(location_key, piece_key)
    find(".Membership.is_#{location_key} .piece_#{piece_key}").click
  end

  # 持駒を place に打つ
  def stand_move(location_key, piece_key, place)
    stand_click(location_key, piece_key)
    place_click(place)
  end

  # place の位置の駒を持ち上げ中か？
  def lifted_from(place)
    assert_selector "#{place_class(place)}.lifted_from_p"
  end

  # place の位置の駒を持ち上げてない
  def no_lifted_from(place)
    assert_no_selector "#{place_class(place)}.lifted_from_p"
  end

  # location_key 色の piece_key が盤上にある
  def assert_soldier_exist(location_key, piece_key, promoted)
    assert_selector ".ShogiPlayer .MainBoard .PieceTexture.location_#{location_key}.promoted_#{promoted}.piece_name.piece_#{piece_key}"
  end
end
