module MyHelper
  def session_options_hash
    Capybara::SessionConfig::OPTIONS.inject({}) { |a, e| a.merge(a.merge(e => Capybara.session_options.send(e))) }
  end
end
