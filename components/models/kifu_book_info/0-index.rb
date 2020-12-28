#!/usr/bin/env ruby
require "pathname"
require "table_format"
require "json"
rows = Pathname(".").glob("*.kif").sort.collect { |e|
  s = e.read
  h = s.scan(/(.*)：(.*)/).to_h
  key = "KIF_" + e.basename('.*').to_s
  {
    :key        => key,
    :kif_code   => e.basename('.*').to_s,
    :generation => s.slice(/\d+局/)&.to_i,
    :name       => h["開始日時"].tr("/", "-") + " " + h["棋戦詳細"],
    :black      => h["先手"] || h["下手"],
    :white      => h["後手"] || h["上手"],
    :sp_body    => key,
  }
}.sort_by { |e| e[:name] || 0 }

rows.each do |e|
  puts %(import #{e[:key]} from "./KifuBookInfo/#{e[:kif_code]}.kif")
end
rows = rows.collect{|e|e.transform_keys(&:to_s)}
rows.each do |e|
  s = e.to_json
  s.gsub!(/sp_body":"/, 'sp_body":')
  s.gsub!(/"}/, "},")
  puts s
end
# >> import KIF_27479 from "./KifuBookInfo/27479.kif"
# >> import KIF_27480 from "./KifuBookInfo/27480.kif"
# >> import KIF_27481 from "./KifuBookInfo/27481.kif"
# >> import KIF_27584 from "./KifuBookInfo/27584.kif"
# >> import KIF_27482 from "./KifuBookInfo/27482.kif"
# >> import KIF_16216 from "./KifuBookInfo/16216.kif"
# >> import KIF_15732 from "./KifuBookInfo/15732.kif"
# >> import KIF_39801 from "./KifuBookInfo/39801.kif"
# >> import KIF_27483 from "./KifuBookInfo/27483.kif"
# >> import KIF_27484 from "./KifuBookInfo/27484.kif"
# >> import KIF_08731 from "./KifuBookInfo/08731.kif"
# >> import KIF_27485 from "./KifuBookInfo/27485.kif"
# >> import KIF_27486 from "./KifuBookInfo/27486.kif"
# >> import KIF_27487 from "./KifuBookInfo/27487.kif"
# >> import KIF_27488 from "./KifuBookInfo/27488.kif"
# >> import KIF_16020 from "./KifuBookInfo/16020.kif"
# >> import KIF_27489 from "./KifuBookInfo/27489.kif"
# >> import KIF_27637 from "./KifuBookInfo/27637.kif"
# >> import KIF_27490 from "./KifuBookInfo/27490.kif"
# >> import KIF_27585 from "./KifuBookInfo/27585.kif"
# >> import KIF_15733 from "./KifuBookInfo/15733.kif"
# >> import KIF_37368 from "./KifuBookInfo/37368.kif"
# >> import KIF_16217 from "./KifuBookInfo/16217.kif"
# >> {"key":"KIF_27479","kif_code":"27479","generation":1,"name":"1709-10-10 宗銀印達57番指し1局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27479},
# >> {"key":"KIF_27480","kif_code":"27480","generation":2,"name":"1709-10-11 宗銀印達57番指し2局","black":"伊藤印達","white":"六代大橋宗銀","sp_body":KIF_27480},
# >> {"key":"KIF_27481","kif_code":"27481","generation":3,"name":"1709-10-18 宗銀印達57番指し3局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27481},
# >> {"key":"KIF_27584","kif_code":"27584","generation":null,"name":"1709-10-22 御城将棋 将棋絶妙第6番","black":"伊藤印達","white":"三代大橋宗与","sp_body":KIF_27584},
# >> {"key":"KIF_27482","kif_code":"27482","generation":4,"name":"1709-10-29 宗銀印達57番指し4局","black":"伊藤印達","white":"六代大橋宗銀","sp_body":KIF_27482},
# >> {"key":"KIF_16216","kif_code":"16216","generation":5,"name":"1709-11-01 宗銀印達57番指し5局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_16216},
# >> {"key":"KIF_15732","kif_code":"15732","generation":6,"name":"1709-11-02 宗銀印達57番指し6局","black":"伊藤印達","white":"六代大橋宗銀","sp_body":KIF_15732},
# >> {"key":"KIF_39801","kif_code":"39801","generation":7,"name":"1709-11-03 宗銀印達57番指し7局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_39801},
# >> {"key":"KIF_27483","kif_code":"27483","generation":8,"name":"1709-11-05 宗銀印達57番指し8局","black":"伊藤印達","white":"六代大橋宗銀","sp_body":KIF_27483},
# >> {"key":"KIF_27484","kif_code":"27484","generation":9,"name":"1709-11-07 宗銀印達57番指し9局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27484},
# >> {"key":"KIF_08731","kif_code":"08731","generation":10,"name":"1709-11-08 宗銀印達57番指し10局","black":"伊藤印達","white":"六代大橋宗銀","sp_body":KIF_08731},
# >> {"key":"KIF_27485","kif_code":"27485","generation":12,"name":"1709-11-12 宗銀印達57番指し12局","black":"伊藤印達","white":"六代大橋宗銀","sp_body":KIF_27485},
# >> {"key":"KIF_27486","kif_code":"27486","generation":13,"name":"1709-11-13 宗銀印達57番指し13局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27486},
# >> {"key":"KIF_27487","kif_code":"27487","generation":24,"name":"1709-11-25 宗銀印達57番指し24局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27487},
# >> {"key":"KIF_27488","kif_code":"27488","generation":25,"name":"1709-11-25 宗銀印達57番指し25局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27488},
# >> {"key":"KIF_16020","kif_code":"16020","generation":37,"name":"1709-12-13 宗銀印達57番指し37局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_16020},
# >> {"key":"KIF_27489","kif_code":"27489","generation":41,"name":"1710-01-16 宗銀印達57番指し41局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27489},
# >> {"key":"KIF_27637","kif_code":"27637","generation":44,"name":"1710-01-18 宗銀印達57番指し44局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27637},
# >> {"key":"KIF_27490","kif_code":"27490","generation":54,"name":"1710-03-19 宗銀印達57番指し54局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_27490},
# >> {"key":"KIF_27585","kif_code":"27585","generation":null,"name":"1710-11-03 御城将棋 将棋絶妙第7番","black":"伊藤印達","white":"三代大橋宗与","sp_body":KIF_27585},
# >> {"key":"KIF_15733","kif_code":"15733","generation":57,"name":"1711-02-28 宗銀印達57番指し57局","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_15733},
# >> {"key":"KIF_37368","kif_code":"37368","generation":null,"name":"1711-03-00 将棋絶妙第8番","black":"宮本印佐","white":"伊藤印達","sp_body":KIF_37368},
# >> {"key":"KIF_16217","kif_code":"16217","generation":null,"name":"1711-11-21 御城将棋 (印達の絶局)","black":"六代大橋宗銀","white":"伊藤印達","sp_body":KIF_16217},
