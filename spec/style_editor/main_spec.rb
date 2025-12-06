RSpec.describe __FILE__ do
  it "スタイルエディタが開く" do
    visit_to "/style-editor"
    assert_text "スタイルエディタ"
  end
end
