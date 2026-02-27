require "#{__dir__}/setup"

RSpec.describe __FILE__ do
  # 最初から王手状態
  def danger_sfen
    "position sfen 8k/6b1l/5R+rG1/8K/8P/9/9/9/9 b P 1"
  end

  # 王手になっていない状態
  def normal_sfen
    "position sfen 8k/6b2/6+rG1/8K/8P/9/9/9/9 b P 1"
  end

  # 打ち歩詰め1手前
  def pawn_drop_mate_sfen
    "position sfen k8/1sG6/G8/9/9/9/9/9/9 b P 1"
  end

  def case1(illegal_key, options = {}, &block)
    options = {
      sp_body: danger_sfen,
    }.merge(options)
    visit_to("/style-editor", {
        sp_request_checkmate_stat: true,
        sp_request_position_hash: true,
        sp_request_op_king_check: true,
        sp_illegal_validate: true,
        sp_illegal_cancel: true,
        sp_mode: :play,
        sp_controller: true,
        sidebar_p: false,
        sp_dev_tools_group: :event,
        **options,
      })
    yield
    find(:button, :class => "dev_tools").click
    assert_text %("#{illegal_key}")
  end

  def case2(illegal_key, &block)
    case1(illegal_key, sp_body: normal_sfen, &block)
  end

  it "二歩" do
    case1("illegal_double_pawn") { stand_drop(:black, :P, "13") }
  end

  it "打ち歩詰め" do
    case1("illegal_pawn_drop_mate", sp_body: pawn_drop_mate_sfen) { stand_drop(:black, :P, "92") }
  end

  it "駒ワープ" do
    case1("illegal_warp_move") { piece_move("43", "13") }
  end

  it "死に駒" do
    case1("illegal_dead_piece") { stand_drop(:black, :P, "21") }
  end

  describe "王手放置" do
    it "打 (うっかり系)" do
      case1("illegal_check_ignored") { stand_drop(:black, :P, "24") }
    end
    it "移動 玉以外 (うっかり系)" do
      case1("illegal_check_ignored") { piece_move("23", "32") }
    end
    it "移動 玉 (故意に王手解除せず)" do
      case1("illegal_no_check_escape") { piece_move("14", "13") }
    end
  end

  describe "自殺手" do
    it "故意" do
      case2("illegal_self_check") { piece_move("14", "24") }
    end
    it "ピン外し" do
      case2("illegal_pin_break_check") { piece_move("23", "33") }
    end
  end
end
