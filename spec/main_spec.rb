RSpec.describe 'Style Editor Page' do
  it "スタイルエディタが開く" do
    visit "/style-editor"
    assert_text "スタイルエディタ"
  end

  # it "works" do
  #   tp session_options_hash
  # end
end
