require "#{__dir__}/setup"

RSpec.describe __FILE__ do
  def case1
    visit_to("/style-editor", {
        :sp_mode   => :play,
        :sidebar_p => false,
        :sp_body   => "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b KRB2G2S2N2L9Pkrb2g2s2n2l9p 1",
      })
  end

  it "盤上" do
    case1
    board_place("59").right_click
    assert_selector(".place_5_9 .ThinkMarkLayer")
    board_place("59").right_click
    assert_no_selector(".place_5_9 .ThinkMarkLayer")
  end

  it "駒台" do
    case1
    stand_piece(:black, :P).right_click
    assert_selector(".Membership.is_black .ThinkMarkLayer")
    stand_piece(:black, :P).right_click
    assert_no_selector(".Membership.is_black .ThinkMarkLayer")
  end
end
