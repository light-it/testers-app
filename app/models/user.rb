class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  mount_uploader :photo, PhotoUploader

  validates :first_name, :last_name, :presence => true, :length => {:minimum => 2}

  def full_name
    "#{first_name} #{last_name}"
  end

  # pagination size
  self.per_page = 10
end
