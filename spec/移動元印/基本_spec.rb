require "#{__dir__}/setup"

RSpec.describe __FILE__ do
  def case1
    visit_to("/style-editor", {
        :sp_mode   => :play,
        :sidebar_p => false,
        :sp_body   => "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b KRB2G2S2N2L9Pkrb2g2s2n2l9p 1",
      })
  end

  describe "盤上" do
    it "戻す" do
      case1
      board_place("59").click
      assert_selector(".place_5_9 .OriginMarkLayer")
      board_place("59").click
      assert_no_selector(".place_5_9 .OriginMarkLayer")
    end

    it "指す" do
      case1
      board_place("59").click
      assert_selector(".place_5_9 .OriginMarkLayer")
      board_place("58").click
      assert_no_selector(".place_5_9 .OriginMarkLayer")
    end
  end

  describe "持駒" do
    it "戻す" do
      case1
      stand_piece(:black, :P).click
      assert_selector(".Membership.is_black .OriginMarkLayer")
      stand_of(:black).click
      assert_no_selector(".Membership.is_black .OriginMarkLayer")
    end

    it "指す" do
      case1
      stand_piece(:black, :P).click
      assert_selector(".Membership.is_black .OriginMarkLayer")
      board_place("55").click
      assert_no_selector(".Membership.is_black .OriginMarkLayer")
    end
  end
end
