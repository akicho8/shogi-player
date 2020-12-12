require "bundler/inline"

gemfile do
  gem "rmagick"
end

require "rmagick"
require "pathname"

class App
  def run
    [
      [256, 256],
      [320, 240],
      [512, 512],
      [640, 640],
      [640, 480],
      [480, 640],
      [800, 800],
    ].each do |w, h|
      cell = 16

      base = Magick::Image.new(w, h)

      img = Magick::ImageList.new
      img.new_image(base.columns, base.rows, Magick::HatchFill.new("transparent", "lightblue2", cell))
      base = base.composite(img, 0, 0, Magick::OverCompositeOp)

      gc = Magick::Draw.new
      gc.annotate(base, 0, 0, 0, 0, "#{w}x#{h}") do
        # self.font      = f.name                  # フォント名
        self.fill      = "black"                   # フォント塗りつぶし色（黒）
        self.stroke    = "transparent"             # フォント縁取り色（透過）
        self.pointsize = 32                        # フォントサイズ
        self.gravity   = Magick::CenterGravity     # 描画開始位置（左上）
      end

      # gc = Magick::Draw.new
      # gc.stroke("blue")                                   # 枠の色
      # gc.stroke_width(0)                                # 画面端に筆を走らせると実際に描画される大きさは半分になることに注意
      # gc.fill(Magick::TransparentAlpha)                 # 透明 = 塗り潰しなしということ
      # gc.rectangle(0, 0, 64, 64)
      # gc.draw(base)

      gc = Magick::Draw.new
      gc.stroke("blue")                                   # 枠の色
      gc.stroke_width(1*2)                                # 画面端に筆を走らせると実際に描画される大きさは半分になることに注意
      gc.fill("transparent")                              # 透明 = 塗り潰しなしということ
      gc.rectangle(0, 0, base.columns - 1, base.rows - 1) # 画面端なら -1 が必要
      gc.draw(base)

      filename = "#{w}x#{h}.png"
      base.write(filename)
      puts filename
      # system("open #{filename}")
    end
  end
end

App.new.run
# >> 320x240.png
